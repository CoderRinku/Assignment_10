import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'
import { MongoClient, ObjectId } from 'mongodb'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_stripe_key')

app.use(cors())
app.use(express.json())

const uri = process.env.DB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized access' })
  }
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized access' })
    }
    req.decoded = decoded
    next()
  })
}

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email
  const user = await client.db('resideease').collection('users').findOne({ email })
  if (user?.role !== 'Admin') {
    return res.status(403).send({ message: 'Forbidden access' })
  }
  next()
}

const verifyOwner = async (req, res, next) => {
  const email = req.decoded.email
  const user = await client.db('resideease').collection('users').findOne({ email })
  if (user?.role !== 'Owner') {
    return res.status(403).send({ message: 'Forbidden access' })
  }
  next()
}

async function run() {
  try {
    await client.connect()
    console.log('Successfully connected to MongoDB')

    const usersCollection = client.db('resideease').collection('users')
    const propertiesCollection = client.db('resideease').collection('properties')
    const bookingsCollection = client.db('resideease').collection('bookings')
    const favoritesCollection = client.db('resideease').collection('favorites')
    const reviewsCollection = client.db('resideease').collection('reviews')
    
    app.post('/jwt', (req, res) => {
      const { email } = req.body
      if (!email) {
        return res.status(400).send({ message: 'Email is required' })
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' })
      res.send({ token })
    })

    app.post('/users', async (req, res) => {
      const user = req.body
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null })
      }
      const result = await usersCollection.insertOne({
        ...user,
        role: 'Tenant',
        status: 'Active'
      })
      res.send(result)
    })

    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email
      const user = await usersCollection.findOne({ email })
      res.send({ role: user?.role || 'Tenant', status: user?.status || 'Active' })
    })

    app.post('/properties', verifyToken, verifyOwner, async (req, res) => {
      const property = req.body
      const result = await propertiesCollection.insertOne({
        ...property,
        status: 'Pending'
      })
      res.send(result)
    })

    app.get('/properties/owner/:email', verifyToken, verifyOwner, async (req, res) => {
      const email = req.params.email
      const result = await propertiesCollection.find({ 'owner.email': email }).toArray()
      res.send(result)
    })

    app.delete('/properties/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const result = await propertiesCollection.deleteOne({ _id: new ObjectId(id) })
      res.send(result)
    })

    app.patch('/properties/status/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const { status, rejectionFeedback } = req.body
      const updateDoc = {
        $set: { status }
      }
      if (rejectionFeedback) {
        updateDoc.$set.rejectionFeedback = rejectionFeedback
      }
      const result = await propertiesCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      )
      res.send(result)
    })

    app.get('/properties/all', verifyToken, verifyAdmin, async (req, res) => {
      const result = await propertiesCollection.find().toArray()
      res.send(result)
    })

    app.get('/properties', async (req, res) => {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 6
      const search = req.query.search || ''
      const type = req.query.type || ''
      const minPrice = parseFloat(req.query.minPrice) || 0
      const maxPrice = parseFloat(req.query.maxPrice) || Infinity
      const sort = req.query.sort || ''

      const query = { status: 'Approved' }

      if (search) {
        query.location = { $regex: search, $options: 'i' }
      }
      if (type) {
        query.type = type
      }
      if (minPrice || maxPrice !== Infinity) {
        query.rent = { $gte: minPrice, $lte: maxPrice }
      }

      let sortDoc = {}
      if (sort === 'lowToHigh') {
        sortDoc.rent = 1
      } else if (sort === 'highToLow') {
        sortDoc.rent = -1
      }

      const skip = (page - 1) * limit
      const total = await propertiesCollection.countDocuments(query)
      const properties = await propertiesCollection
        .find(query)
        .sort(sortDoc)
        .skip(skip)
        .limit(limit)
        .toArray()

      res.send({
        properties,
        totalPages: Math.ceil(total / limit)
      })
    })

    app.post('/bookings', verifyToken, async (req, res) => {
      const { propertyId, moveInDate, contactNumber, notes } = req.body
      if (!propertyId) {
        return res.status(400).send({ message: 'Property ID is required' })
      }
      const property = await propertiesCollection.findOne({ _id: new ObjectId(propertyId) })
      if (!property) {
        return res.status(404).send({ message: 'Property not found' })
      }
      const booking = {
        propertyId: new ObjectId(propertyId),
        propertyTitle: property.title,
        propertyImage: property.image,
        rent: property.rent,
        moveInDate,
        contactNumber,
        notes,
        tenantEmail: req.decoded.email,
        status: 'Pending'
      }
      const result = await bookingsCollection.insertOne(booking)
      res.send({ bookingId: result.insertedId })
    })

    app.post('/create-payment-intent', verifyToken, async (req, res) => {
      const { price } = req.body
      if (!price) {
        return res.status(400).send({ message: 'Price is required' })
      }
      const amount = Math.round(price * 100)
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
          payment_method_types: ['card']
        })
        res.send({ clientSecret: paymentIntent.client_secret })
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
    })

    app.post('/bookings/confirm-payment', verifyToken, async (req, res) => {
      const { propertyId, transactionId } = req.body
      const query = {
        $or: [
          { _id: new ObjectId(propertyId) },
          { propertyId: new ObjectId(propertyId) }
        ],
        tenantEmail: req.decoded.email
      }
      const updateDoc = {
        $set: {
          status: 'Paid',
          transactionId
        }
      }
      const result = await bookingsCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    app.get('/bookings/tenant/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      if (req.decoded.email !== email) {
        return res.status(403).send({ message: 'Forbidden access' })
      }
      const result = await bookingsCollection.find({ tenantEmail: email }).toArray()
      res.send(result)
    })

    app.post('/favorites', verifyToken, async (req, res) => {
      const { propertyId } = req.body
      if (!propertyId) {
        return res.status(400).send({ message: 'Property ID is required' })
      }
      const property = await propertiesCollection.findOne({ _id: new ObjectId(propertyId) })
      if (!property) {
        return res.status(404).send({ message: 'Property not found' })
      }
      const favoriteItem = {
        tenantEmail: req.decoded.email,
        propertyId: new ObjectId(propertyId),
        title: property.title,
        image: property.image,
        location: property.location,
        rent: property.rent,
        rentType: property.rentType
      }
      const result = await favoritesCollection.insertOne(favoriteItem)
      res.send(result)
    })

    app.get('/favorites/my-favorites', verifyToken, async (req, res) => {
      const email = req.decoded.email
      const result = await favoritesCollection.find({ tenantEmail: email }).toArray()
      res.send(result)
    })

    app.delete('/favorites/:id', verifyToken, async (req, res) => {
      const id = req.params.id
      const result = await favoritesCollection.deleteOne({ _id: new ObjectId(id) })
      res.send(result)
    })

    app.post('/reviews', verifyToken, async (req, res) => {
      const { propertyId, rating, comment } = req.body
      if (!propertyId) {
        return res.status(400).send({ message: 'Property ID is required' })
      }
      const user = await client.db('resideease').collection('users').findOne({ email: req.decoded.email })
      const reviewDoc = {
        propertyId: new ObjectId(propertyId),
        name: user?.name || 'Anonymous User',
        email: req.decoded.email,
        rating: parseInt(rating) || 5,
        comment,
        date: new Date().toISOString().split('T')[0]
      }
      const result = await reviewsCollection.insertOne(reviewDoc)
      res.send({ ...reviewDoc, _id: result.insertedId })
    })

    app.get('/reviews/property/:id', async (req, res) => {
      const id = req.params.id
      const result = await reviewsCollection.find({ propertyId: new ObjectId(id) }).toArray()
      res.send(result)
    })

    app.get('/owner/analytics', verifyToken, verifyOwner, async (req, res) => {
      const email = req.decoded.email
      const ownerProperties = await propertiesCollection.find({ 'owner.email': email }).toArray()
      const propertyIds = ownerProperties.map(p => p._id)

      const bookings = await bookingsCollection.find({ propertyId: { $in: propertyIds } }).toArray()
      const paidBookings = bookings.filter(b => b.status === 'Paid')
      
      const totalProperties = ownerProperties.length
      const totalBookings = bookings.length
      const totalEarnings = paidBookings.reduce((sum, b) => sum + (b.rent || 0), 0)

      const monthlyMap = {}
      paidBookings.forEach(b => {
        const date = b.moveInDate ? new Date(b.moveInDate) : new Date()
        const monthStr = date.toLocaleString('default', { month: 'short', year: 'numeric' })
        monthlyMap[monthStr] = (monthlyMap[monthStr] || 0) + (b.rent || 0)
      })
      const chartData = Object.keys(monthlyMap).map(month => ({
        month,
        earnings: monthlyMap[month]
      }))

      res.send({
        totalProperties,
        totalBookings,
        totalEarnings,
        chartData
      })
    })

    app.get('/properties/my-properties', verifyToken, verifyOwner, async (req, res) => {
      const email = req.decoded.email
      const result = await propertiesCollection.find({ 'owner.email': email }).toArray()
      res.send(result)
    })

    app.patch('/properties/:id', verifyToken, verifyOwner, async (req, res) => {
      const id = req.params.id
      const updatedData = req.body
      const result = await propertiesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      )
      res.send(result)
    })

    app.get('/bookings/owner/:email', verifyToken, verifyOwner, async (req, res) => {
      const email = req.params.email
      if (req.decoded.email !== email) {
        return res.status(403).send({ message: 'Forbidden access' })
      }
      const ownerProperties = await propertiesCollection.find({ 'owner.email': email }).toArray()
      const propertyIds = ownerProperties.map(p => p._id)
      const result = await bookingsCollection.find({ propertyId: { $in: propertyIds } }).toArray()
      res.send(result)
    })

    app.patch('/bookings/status/:id', verifyToken, verifyOwner, async (req, res) => {
      const id = req.params.id
      const { status } = req.body
      const result = await bookingsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      )
      res.send(result)
    })

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    app.patch('/users/role/:email', verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params.email
      const { role } = req.body
      const result = await usersCollection.updateOne(
        { email },
        { $set: { role } }
      )
      res.send(result)
    })

    app.patch('/users/status/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const { status } = req.body
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      )
      res.send(result)
    })

    app.get('/admin/transactions', verifyToken, verifyAdmin, async (req, res) => {
      const result = await bookingsCollection.find({ status: 'Paid' }).toArray()
      res.send(result)
    })

    app.get('/', (req, res) => {
      res.send({ status: 'Server is running perfectly' })
    })

  } catch (error) {
    console.error('Database connection failed', error)
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

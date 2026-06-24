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

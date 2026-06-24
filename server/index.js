import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

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

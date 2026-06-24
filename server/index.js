import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.DB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()
    console.log('Successfully connected to MongoDB')
    
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

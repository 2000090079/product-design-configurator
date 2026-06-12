import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import configurationsRouter from './routes/configurations'
import uploadsRouter from './routes/uploads'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(cors())
app.use(express.json())
app.use('/api/configurations', configurationsRouter)
app.use('/api/uploads', uploadsRouter)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/design-configurator')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const tutorRoutes = require('./routes/tutor')
const protect = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('LAMIF API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/tutor', tutorRoutes)

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'you are authorized!', user: req.user })
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => console.log('MongoDB error:', err))
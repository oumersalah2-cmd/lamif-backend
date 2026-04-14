const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express()



app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB error:', err))

app.use('/api/auth', authRoutes)

app.get(`/`, (req, res ) => {
    res.send('LAMIF API is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const protected = require(`./middleware/authMiddleware`)

app.get(`/api/protected`, protected, (req, res) => {
    res.json({ message: 'you are authorized!', user: req.user})
})

const tutorRoutes = require('./routes/tutor')
app.use('/api/tutor', tutorRoutes)
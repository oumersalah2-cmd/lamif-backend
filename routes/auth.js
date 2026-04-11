const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await user.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router



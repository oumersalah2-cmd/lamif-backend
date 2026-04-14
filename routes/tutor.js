const express = require('express')
const router = express.Router()
const Tutor = require('../models/Tutor')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, async (req, res) => {
    try {
        const { Bio, Subject, hourlyRate, education } = req.body

        const existingProfile = await Tutor.findOne({ user: req.user.id })
        if (existingProfile) {
            return res.status(400).json({ message: 'Tutor profile already exists' })
        }

        const tutor = new Tutor({
            user: req.user.id,
            Bio,    
            Subject,
            hourlyRate,
            education
        })

        await tutor.save()

        res.status(201).json({ message: 'Tutor profile created successfully', tutor })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
    })

    router.get(`/all`, async (req, res) => {
        try {
            const tutors = await Tutor.find({ isAvailable: true }).populate('user', 'name email')
            res.status(200).json(tutors)
        
        } catch (error) {
            res.status(500).json({ message: 'Server error', error })
        }
    })

    router.get('/:id',async (req, res) => {
        try {
            const tutor = await Tutor.findById(req.params.id).populate('user', 'name email')

            if (!tutor) {
                return res.status(404).json({ message: 'Tutor profile not found' })
            }

            res.status(200).json(tutor)

        } catch (error) {
            res.status(500).json({ message: 'Server error', error })
        }   
    })

module.exports = router
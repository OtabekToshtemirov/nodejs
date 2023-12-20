const {validateEnrollment, Enrollment} = require("../models/enrollment")
const {Customer} = require('../models/customer')
const mongoose = require("mongoose")

const {Course} = require('../models/course');
const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/',auth, async (req, res) => {
    const {error} = validateEnrollment(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const customerId = mongoose.Types.ObjectId.isValid(req.body.customerId)
    if (!customerId){
        return res.status(404).send('CustomerId is not valid')
    }
    const customer = await Customer.findById(req.body.customerId)

    if (!customer)
        return res.status(404).send('Customer not found')
    const courseId = mongoose.Types.ObjectId.isValid(req.body.courseId)
    if (!courseId){
        return res.status(404).send('CourseId is not valid')
    }
    const course = await Course.findById(req.body.courseId)

    if (!course)
        return res.status(404).send('Course not found')

    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee,
        date: req.body.date
    })
    if (customer.isVip){
        enrollment.courseFee = course.fee - (0.2 * course.fee)
    }
    customer.bonusPoints++;
    customer.save()
    enrollment = await enrollment.save()
    res.send(enrollment)
})

router.get('/',auth,  async (req, res) => {
    const enrollments = await Enrollment.find()
    if (enrollments.length === 0) return res.status(404).send('No enrollments found')
    res.send(enrollments)
})


router.get('/:id', auth, async (req, res) => {
    const enrollment = await Enrollment.findById(req.params.id)
    if (!enrollment) return res.status(404).send('Enrollment not found')
    res.send(enrollment)
})


module.exports = router


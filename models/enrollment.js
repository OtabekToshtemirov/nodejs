const mongoose = require("mongoose")
const Joi = require("joi")

const enrollmentSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
        }),
        required: true,
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
        }),
        required: true,
    },
    courseFee: {
        type: Number,
        default: 0,
        min: 0,
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)

function validateEnrollment(enrollment) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
    })
    return schema.validate(enrollment)
}

module.exports = {
    Enrollment,
    validateEnrollment,
}

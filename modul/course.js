const mongoose = require('mongoose')
const Joi = require('joi')
const categorySchema = require('../modul/category')

const courseSchema = new mongoose.Schema({
    tags: {
        type: Array,
        required: true,
    },
    title:String,
    trainer:String,
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Inactive',
    },

    category: {
        type: categorySchema,
        required: true,
        // Set a default category ID
    },
})

const Course = mongoose.model('Course', courseSchema)


function validateCourse(course) {
    const schema = Joi.object({
        title : Joi.string().required().min(3).max(50),
        trainer : Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        categoryId: Joi.string().required(),
    })

    return schema.validate(course)
}

module.exports = {
    Course,
    validateCourse,
};

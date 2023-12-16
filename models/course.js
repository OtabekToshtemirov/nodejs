const mongoose = require('mongoose')
const Joi = require('joi')
const {categorySchema} = require('.//category')

const courseSchema = new mongoose.Schema({
    tags: {
        type:[String]
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:250
    },
    trainer: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
    },

    category: {
        type: categorySchema,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
        min: 0,
    }
})

const Course = mongoose.model('Course', courseSchema)


function validateCourse(course) {
    const schema = Joi.object({
        title : Joi.string().required().min(3).max(50),
        trainer : Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        categoryId: Joi.string().required(),
        fee: Joi.number().required().min(0),
    })

    return schema.validate(course)
}
module.exports.Course = Course;
module.exports.validateCourse = validateCourse;

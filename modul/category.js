const joi = require('joi')
const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowerCase: true,
    }

})

const Category = mongoose.model('Category', categorySchema)

function validatorName(name) {
    const schema = joi.object({
        name: joi.string().required()
    })
    return schema.validate(name)
}

module.exports.Category =Category
module.exports.validatorName =validatorName
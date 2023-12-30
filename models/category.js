const joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowerCase: true,
        minLength: 5,
        maxLength: 50
    }
});

const Category = mongoose.model('Category', categorySchema);

function validatorName(name) {
    const schema = joi.object({
        name: joi.string().required().min(5).max(50)
    });
    return schema.validate(name);
}

module.exports = {
    Category: Category,
    validatorName: validatorName,
    categorySchema: categorySchema
};

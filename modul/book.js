const mongoose = require('mongoose');
const joi = require('joi');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
    },
    author: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        validate: {
            validator: function(value) {
                return value && value.length > 0;
            },
            message: 'Kamida bir tag kiritilmadi'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 0,
        required: function () {
            return this.isPublished
        }
    }
})
const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = joi.object({
        title: joi.string().min(4).required(),
        author: joi.string().required(),
        tags: joi.array().min(1).items(joi.string()),
        isPublished: joi.boolean().required(),
        price: joi.number().min(0).required()
    });
    return schema.validate(book);
}
module.exports = {
    Book,
    validateBook
}


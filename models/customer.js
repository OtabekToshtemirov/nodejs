const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isVip: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength:5,
        maxlength:15
    },
    bonusPoints: {
        type: Number,
        default: 0
    }
});


const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().required().min(5).max(15),
        bonusPoints: Joi.number()
    })
    return schema.validate(customer)
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
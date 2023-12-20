const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isAdmin: Boolean
})

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', UserSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().required()
    })
    return schema.validate(user)
}


module.exports = {User, validateUser};
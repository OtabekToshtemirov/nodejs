const Joi = require('joi');
const { User } = require('./models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).json({ status: 'error', message: 'Invalid input data' });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).json({ status: 'success', message: 'Login successful' });
    } catch (err) {
        console.error('Internal Server Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// create get request

router.get

function validate(request) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(request);
}

module.exports = router;

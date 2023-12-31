const express = require('express')
const router = express.Router()
const {User, validateUser} = require('../models/user')
const _ = require('lodash')
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth')


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})
router.post('/', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('With this email user already exists!')

    user = await new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

    await user.save()
    res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']))
})
// get all users
router.get('/', async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(404).send('No users found!')
    res.send(users.map(user => _.pick(user, ['_id', 'name', 'email'])))
})

// get user by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('User not found!')
    res.send(user)
})

// update a user by id

router.put('/:id', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('User not found!')

    user.set({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user + 'User updated!')
})

// delete a user by id

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send('User not found!')
    res.send('User deleted!' + user)
})

module.exports = router


const express = require('express')
const router = express.Router()
const {User, validateUser} = require('../models/user')


// create a new user
router.post('/', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user + 'User created!')
})
// get all users
router.get('/', async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(404).send('No users found!')
    res.send(users)
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

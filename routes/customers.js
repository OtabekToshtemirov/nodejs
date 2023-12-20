const {Customer, validateCustomer} = require('../models/customer')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.json(customers)
})



router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        return res.status(404).json({message: 'Customer not found'})
    }

    res.json(customer)
})

router.post('/', async (req, res) => {

    const {error} = validateCustomer(req.body)
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoints: req.body.bonusPoints
    })
    customer = await customer.save()
    res.status(201).send(customer)
})

router.put('/:id', auth,async (req, res) => {
    const {error} = validateCustomer(req.body)
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        return res.status(404).json({message: 'Customer not found'})
    }
    customer.name = req.body.name
    customer.isVip = req.body.isVip
    customer.phone = req.body.phone
    await customer.save()
    res.json(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
        return res.status(404).json({message: 'Customer not found'})
    }
    res.json({message: 'Customer successfully deleted'})
})

module.exports = router
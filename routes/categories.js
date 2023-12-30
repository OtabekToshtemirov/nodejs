const express = require('express')
const router = express.Router()
const { validatorName, Category } =require('../models/category')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require("mongoose");



router.post('/',auth ,async (req, res) => {
    const { error } = validatorName(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let category = await new Category({
        name: req.body.name
    })
    category = await category.save()
    res.send(category)

})

router.get('/', async (req, res) => {

    const category = await Category.find()
    res.send(category)

})

router.get('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        return res.status(404).send('Bunday id mavjud emas')
    }
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).send('Bunday id li category mavjud emas')
    }
    res.send(category)

})

router.put('/:id',auth, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        return res.status(404).send('Bunday id mavjud emas')
    }
    const { error } = validatorName(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })
    if (!category) {
        return res.status(404).send('Bunday id li category mavjud emas')
    }
    res.send(category)
})

router.delete('/:id',[ auth, admin ], async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        return res.status(404).send('Bunday id mavjud emas')
    }
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).send('Bunday id li category mavjud emas')
    }
    res.send(category)
})

module.exports = router;


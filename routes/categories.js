const express = require('express')
const router = express.Router()
const { validatorName, Category } =require('../models/category')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')



router.post('/',auth ,async (req, res) => {
    try {
        const { error } = validatorName(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const category = await new Category({
            name: req.body.name
        })
        const savedCategory = await category.save()
        res.send(savedCategory)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/', auth, async (req, res) => {

    try {
        const category = await Category.find()
        res.send(category)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/:id',auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send('Xatolik yuz berdi')
        }
        res.send(category)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.put('/:id',auth, async (req, res) => {

    try {
        const { error } = validatorName(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send('Xatolik yuz berdi')
        }
        category.set({
            name: req.body.name
        })
        const updatedCategory = await category.save()
        res.send(updatedCategory)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/:id',[ auth, admin ], async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(400).send('Xatolik yuz berdi')
        }
        res.send(category)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router;




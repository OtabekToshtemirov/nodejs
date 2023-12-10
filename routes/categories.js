const express = require('express')
const router = express.Router()
const { validatorName, Category } =require('../modul/category')



router.post('/', async (req, res) => {

    const category = await new Category({
        name: req.body.name
    })
    const savedCategory = await category.save()
    res.send(savedCategory)
})

router.get('/', async (req, res) => {

    const category = await Category.find()
    if (!category) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    res.send(category)
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    res.send(category)
})

router.put('/:id', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {

    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    const deletedCategory = await category.deleteOne(
        { _id: req.params.id }
    )
    res.send(deletedCategory)
})

module.exports = router;



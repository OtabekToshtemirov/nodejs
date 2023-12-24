const express = require('express')
const router = express.Router()
const { validatorName, Category } =require('../models/category')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')



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

router.get('/', auth, async (req, res) => {

        const category = await Category.find()
        res.send(category)

})

router.get('/:id',auth, async (req, res) => {

        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send('Bunday id li category mavjud emas')
        }
        res.send(category)

})

router.put('/:id',auth, async (req, res) => {
        const { error } = validatorName(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, { new: true })
        if (!category) {
            return res.status(400).send('Bunday id li category mavjud emas')
        };
        res.send(category)
})

router.delete('/:id',[ auth, admin ], async (req, res) => {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(400).send('Bunday id li category mavjud emas')
        }
        res.send(category)
})

module.exports = router;




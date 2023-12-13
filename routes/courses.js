const { Course, validateCourse} = require('../modul/course')
const { Category } = require('../modul/category')
const express = require('express')

const router = express.Router()



router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const category = await Category.findById(req.body.categoryId)
    if (!category) {
        return res.status(400).send('Bunday kategoriya topilmadi')
    }

    const course = await new Course({
        title: req.body.title,
        tags : req.body.tags,
        trainer: req.body.trainer,
        status: req.body.status,
        category: {
            _id: category._id,
            name: category.name
        }
    })
    const savedCourse = await course.save()
    res.send(savedCourse)
})

router.get('/', async (req, res) => {

    const course = await Course.find()
    if (!course) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    res.send(course)
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    res.send(course)
})

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const category = await Category.findById(req.body.categoryId)

    if (!category) {
        return res.status(400).send('Bunday kategoriya topilmadi')
    }

    const course = await Course.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        tags : req.body.tags,
        trainer: req.body.trainer,
        status: req.body.status,
        category: {
            _id: category._id,
            name: category.name
        }
    })
    const updatedCourse = await course.save()
    res.send(updatedCourse)
})

router.delete('/:id', async (req, res) => {

    const course = await Course.findById(req.params.id)
    if (!course) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    const deletedCourse = await course.deleteOne(
        { _id: req.params.id }
    )
    res.send(deletedCourse)
})

module.exports = router;

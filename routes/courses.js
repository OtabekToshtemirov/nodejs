const { Course, validateCourse } = require('../modul/course');
const mongoose = require('mongoose');
const { Category } = require('../modul/category');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Request body:', req.body);

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const categoryId = req.body.categoryId;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).send('Noto‘g‘ri kategoriya ID');
    }

    const category = await Category.findById(categoryId);

    if (!category) {
        return res.status(400).send('Bunday kategoriya topilmadi');
    }

    let course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name,
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status,
    });

    course = await course.save();
    res.send(course);
});

router.get('/', async (req, res) => {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
        return res.status(400).send('Xatolik yuz berdi');
    }
    res.send(courses);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(400).send('Xatolik yuz berdi');
    }
    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const categoryId = req.body.categoryId;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).send('Noto‘g‘ri kategoriya ID');
    }

    const category = await Category.findById(categoryId);

    if (!category) {
        return res.status(400).send('Bunday kategoriya topilmadi');
    }

    const course = await Course.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            tags: req.body.tags,
            trainer: req.body.trainer,
            status: req.body.status,
            category: {
                _id: category._id,
                name: category.name,
            },
        },
        { new: true }
    );

    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(400).send('Xatolik yuz berdi');
    }

    const deletedCourse = await course.deleteOne({ _id: req.params.id });
    res.send(deletedCourse);
});

module.exports = router;

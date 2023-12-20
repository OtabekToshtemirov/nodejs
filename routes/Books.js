const {Book, validateBook} = require('../models/book');
const express = require('express');
const Route = express.Router();
const auth = require('../middleware/auth')


Route.get('/',auth, async (req, res) => {
    const book = await Book.find()
    if (!book) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    res.send(book)
})

Route.post('/',auth, async (req, res) => {
    const { error } = validateBook(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const book = await new Book({
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    })
    const savedBook = await book.save()
    res.send(savedBook)
})

Route.put('/:id',auth, async (req, res) => {
    const { error } = validateBook(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(400).send('Xatolik yuz berdi')
    }
    const options = {new: true}
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        authors: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    }, options)
    res.send(updatedBook)
})

Route.delete('/:id',auth, async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(400).send('Xatolik yuz berdi');
    }
    await book.deleteOne();
    res.send(book);
})

module.exports= Route;

const CategoryRoute = require('./routes/categories');
const BookRoute = require('./routes/books');
const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('MongoDBga ulandi'))
    .catch((err) => console.log( 'Xatolik yuz berdi',err));


app.use(express.json());
app.use('/api/categories', CategoryRoute);
app.use('/api/books', BookRoute);

app.listen(3000, () => console.log('App is running on port 3000'));






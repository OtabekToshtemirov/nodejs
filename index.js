const CategoryRoute = require('./routes/categories');
const BookRoute = require('./routes/books');
const CustomerRoute = require('./routes/customers');
const UserRoute = require('./routes/users');
const CourseRoute = require('./routes/courses')
const Enrollments = require('./routes/enrollments');
const Auth = require('./auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');



if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('MongoDBga ulandi'))
    .catch((err) => console.log( 'Xatolik yuz berdi',err));


app.use(express.json());
app.use('/api/categories', CategoryRoute);
app.use('/api/books', BookRoute);
app.use('/api/customers', CustomerRoute);
app.use('/api/users', UserRoute);
app.use('/api/courses', CourseRoute)
app.use('/api/enrollments', Enrollments)
app.use('/api/auth', Auth);

app.listen(3000, () => console.log('App is running on port 3000'));






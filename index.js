const CategoryRoute = require('./routes/categories');
const BookRoute = require('./routes/books');
const CustomerRoute = require('./routes/customers');
const UserRoute = require('./routes/users');
const CourseRoute = require('./routes/courses')
const Enrollments = require('./routes/enrollments');
const Auth = require('./auth');
const errorMiddleware = require('./middleware/error')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')


winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log' , level: 'error'}));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/test-logs' , level: 'info'}));

if (!config.get('jwtPrivateKey')) {
    winston.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
mongoose.connect('mongodb://localhost/test')
    .then(() => winston.debug('MongoDBga ulanish hosil qilindi...'))
    .catch((err) => winston.error('Xatolik yuz berdi', err));



app.use(express.json());
app.use('/api/categories', CategoryRoute);
app.use('/api/books', BookRoute);
app.use('/api/customers', CustomerRoute);
app.use('/api/users', UserRoute);
app.use('/api/courses', CourseRoute)
app.use('/api/enrollments', Enrollments)
app.use('/api/auth', Auth);
app.use(errorMiddleware)
const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`App is running on port ${port}...`));






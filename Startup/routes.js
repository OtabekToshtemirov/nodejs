const express = require("express");
const CategoryRoute = require("../routes/categories");
const BookRoute = require("../routes/Books");
const CustomerRoute = require("../routes/customers");
const UserRoute = require("../routes/users");
const CourseRoute = require("../routes/courses");
const Enrollments = require("../routes/Enrollments");
const Auth = require("../auth");
const errorMiddleware = require("../middleware/error");


module.exports = function (app) {

    app.use(express.json());
    app.use('/api/categories', CategoryRoute);
    app.use('/api/books', BookRoute);
    app.use('/api/customers', CustomerRoute);
    app.use('/api/users', UserRoute);
    app.use('/api/courses', CourseRoute)
    app.use('/api/enrollments', Enrollments)
    app.use('/api/auth', Auth);
    app.use(errorMiddleware)

}
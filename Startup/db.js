const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    mongoose.connect('mongodb://localhost/test')
        .then(() => {
            winston.debug('MongoDBga ulanish hosil qilindi...');
        });
}
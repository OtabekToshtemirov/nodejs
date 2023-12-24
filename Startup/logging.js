const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
    winston.add(new winston.transports.Console({colorize: true, prettyPrint: true}));
    winston.add(new winston.transports.File({filename: 'logs/vd-logs.log', level: 'error'}));
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/test-logs', level: 'info'}));
    winston.exceptions.handle( new winston.transports.Console() ,new winston.transports.File({filename: 'logs/uncaughtExceptions.log'}));


    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

}
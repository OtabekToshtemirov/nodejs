const express = require('express');
const app = express();
const winston = require('winston');
require('winston-mongodb')
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3001;

const server =   app.listen(port, () => winston.info(`App is running on port ${port}...`));

module.exports = server;






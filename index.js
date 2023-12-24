const express = require('express');
const app = express();
const winston = require('winston');
require('winston-mongodb')
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`App is running on port ${port}...`));






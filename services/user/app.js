const fs = require('fs');
const { join } = require('path');
const express = require('express');

const models = join(__dirname, 'models');
const app = express();

// Setup models
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

// Setup middleware
require('./config/express')(app);

// Setup routes
require('./config/routes')(app);

module.exports = app;

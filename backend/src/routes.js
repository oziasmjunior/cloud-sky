const express = require('express');
const routes = express.Router();

const DatabaseController = require('./controllers/web_database')
routes.post('/database', DatabaseController);

module.exports = { routes };
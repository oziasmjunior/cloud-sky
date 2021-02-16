const express = require('express');
const routes = express.Router();

routes.get('/', (req,res)=>{res.json({"status":"OK"})})

const DatabaseController = require('./controllers/web_database')
routes.post('/database', DatabaseController);

module.exports = { routes };
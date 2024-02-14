const express = require('express');
const RespostasController = require('../controller/RespostasController');
const route = express.Router();

route
    .post('/', RespostasController.Resposta)
    .get('/get-all/:id', RespostasController.GetAllRespostas)


module.exports = route;

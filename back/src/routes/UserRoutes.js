const express = require('express');
const UserController = require('../controller/UserController');
const route = express.Router();

route
    .post('/register', UserController.Register)
    .post('/', UserController.Login)
    .get('/get/:id', UserController.getUserById)
    .post('/delete', UserController.DeleteByJwt)
    .post('/delete/:id', UserController.DeleteById)

module.exports = route;

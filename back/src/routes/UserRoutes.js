const express = require('express');
const UserController = require('../controller/UserController');
const route = express.Router();

route
    .post('/register', UserController.Register)
    .post('/login', UserController.Login)

module.exports = route;

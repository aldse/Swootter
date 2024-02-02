const express = require('express');
const LikesController = require('../controller/LikesController');
const route = express.Router();

route
    .post('/', LikesController.Like)    

module.exports = route;

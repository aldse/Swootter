const express = require('express');
const LikesController = require('../controller/LikesController');
const route = express.Router();

route
    .post('/', LikesController.Like)
    .get('/get-all/:id', LikesController.GetAllLikes)

module.exports = route;

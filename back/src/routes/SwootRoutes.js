const express = require('express');
const SwootController = require('../controller/SwootController');
const route = express.Router();

route
    .post('/', SwootController.Swoot)
    .get('/get-all', SwootController.GetAllSwoots)
    .post('/delete', SwootController.Delete)

module.exports = route;

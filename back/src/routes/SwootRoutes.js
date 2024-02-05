const express = require('express');
const SwootController = require('../controller/SwootController');
const route = express.Router();

route
    .post('/', SwootController.Swoot)
    .post('/delete', SwootController.Delete)

module.exports = route;

const express = require('express');
const SwootController = require('../controller/SwootController');
const route = express.Router();

route
    .post('/', SwootController.Swoot)
    .get('/get/:id', SwootController.GetSwootById)
    .get('/get-all-answers/:id', SwootController.GetAllAnswers)
    .get('/get-all', SwootController.GetAllSwoots)
    .get('/get-by-user-id/:id', SwootController.getSwootsByUserId)
    .get('/get-answers-by-user-id/:id', SwootController.getAnswersByUserId)
    .post('/delete', SwootController.Delete)

module.exports = route;

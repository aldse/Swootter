const express = require('express');
const user = require('../src/routes/UserRoutes');
const swoot = require('../src/routes/SwootRoutes');

module.exports = function (app) {
    app
        .use(express.json())
        .use('/user', user)
        .use('/swoot', swoot)
}
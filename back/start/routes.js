const express = require('express');
const user = require('../src/routes/UserRoutes');

module.exports = function (app) {
    app
        .use(express.json())
        .use('/user', user)
}
const express = require('express');
const user = require('../src/routes/UserRoutes');
const swoot = require('../src/routes/SwootRoutes');
const like = require('../src/routes/LikesRoute');
const resposta = require('../src/routes/RespostasRoute')

module.exports = function (app) {
    app
        .use(express.json())
        .use('/user', user)
        .use('/swoot', swoot)
        .use('/likes', like)
        .use('/resposta', resposta)
}
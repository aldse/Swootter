const express = require('express');
const cors = require('cors');

const app = express();

require('./start/db')();

app.use(cors({
    origin: '*'
}));

require('./start/routes')(app);

const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));
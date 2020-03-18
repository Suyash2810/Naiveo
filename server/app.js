require('./configuration/config');
require('./mongoose/mongoose');
const express = require('express');
const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use((request, response, next) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use(express.static(__dirname + '/public'));

module.exports = app;
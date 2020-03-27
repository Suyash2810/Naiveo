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
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authaccess");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use(express.static(__dirname + '/public/src'));

const {
    authorization
} = require('./middleware/authorization');

const userController = require('./Model View Controller/userController');
const bookingController = require('./Model View Controller/bookingController');
const placeController = require('./Model View Controller/placeController');
const imageExtract = require('./middleware/imageExtract');

// ------------------------------------------User Requests--------------------------------------------->

app.post('/register', imageExtract, userController.register);
app.post('/login', userController.login);

// ------------------------------------------User Requests--------------------------------------------->

app.post('/place', authorization, imageExtract, placeController.savePlace);

app.get('/places', authorization, placeController.getPlaces);

module.exports = app;
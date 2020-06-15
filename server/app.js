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
const reviewController = require('./Model View Controller/reviewController');
const imageExtract = require('./middleware/imageExtract');

// ------------------------------------------User Requests--------------------------------------------->

app.post('/register', imageExtract, userController.register);
app.post('/login', userController.login);
app.get('/user', authorization, userController.fetchUserData);
app.delete('/user', authorization, userController.deleteAccount);
app.get('/guide/:id', authorization, userController.fetchGuide);

// ------------------------------------------Place Requests--------------------------------------------->

app.post('/place', authorization, imageExtract, placeController.savePlace);
app.get('/places', authorization, placeController.getPlaces);
app.get('/place/:id', authorization, placeController.getPlace);
app.patch('/place', authorization, placeController.updatePlace);
app.delete('/place/:id', authorization, placeController.deletePlace);

// ------------------------------------------Booking Requests------------------------------------------->

app.post('/booking', authorization, bookingController.saveBooking);
app.get('/bookings', authorization, bookingController.getBookings);
app.delete("/booking/:id", authorization, bookingController.deleteBooking);

// ------------------------------------------Booking Requests------------------------------------------->

app.post('/review', authorization, reviewController.saveReview);
app.get('/reviews/:placeId', authorization, reviewController.getReviews);
app.patch('/review/:reviewId', authorization, reviewController.updateReview);
app.delete('/review/:reviewId', authorization, reviewController.deleteReview);
app.get('/review/:id', authorization, reviewController.getReview);

module.exports = app;
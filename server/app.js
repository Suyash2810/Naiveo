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
const profileController = require('./Model View Controller/profileController');
const issueController = require('./Model View Controller/issueController');

const imageExtract = require('./middleware/imageExtract');
const {
    profile
} = require('console');

// ------------------------------------------User Requests--------------------------------------------->

app.post('/register', imageExtract, userController.register);
app.post('/login', userController.login);
app.get('/user', authorization, userController.fetchUserData);
app.delete('/user', authorization, userController.deleteAccount);
app.get('/user/:id', authorization, userController.fetchUserById);

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
app.get('/bookings/:id', authorization, bookingController.getBookingsByUserId);

// ------------------------------------------Review Requests------------------------------------------->

app.post('/review', authorization, reviewController.saveReview);
app.get('/reviews/:placeId', authorization, reviewController.getReviews);
app.patch('/review/:reviewId', authorization, reviewController.updateReview);
app.delete('/review/:reviewId', authorization, reviewController.deleteReview);
app.get('/review/:id', authorization, reviewController.getReview);
app.get('/review/rating/:placeId', authorization, reviewController.averageRating);

// ------------------------------------------User Profile Requests------------------------------------------->

app.get('/usersInfo', authorization, profileController.usersInfo);
app.get('/userInfo/:id', authorization, profileController.userInfo);
app.post("/saveUserData/:id", authorization, profileController.saveUserData);
app.patch("/updateUserData/:id", authorization, profileController.updateUserData);
app.patch('/follow/:id', authorization, profileController.follow);
app.patch('/unfollow/:id', authorization, profileController.unfollow);
app.get('/getFollowing/:id', profileController.getFollowing);
app.get('/getFollowers/:id', profileController.getFollowers);
app.patch('/tours/:id', authorization, profileController.toursUpdate);
app.patch("/addOffer/:id", authorization, profileController.addOffer);

// ------------------------------------------User Issue Requests------------------------------------------->

app.post('/issue', authorization, issueController.addIssue);
app.get('/issues/:id', authorization, issueController.getIssues);
app.get('/populateIssues/:id', authorization, issueController.getPopulatedIssues);
app.delete('/issue/:id', authorization, issueController.deleteIssue);

module.exports = app;
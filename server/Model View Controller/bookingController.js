const {
    Booking
} = require('./../models/booking.js');

const {
    pick
} = require('lodash');

const getBookings = async (request, response) => {

    try {
        let result = await Booking.find({});
        if (result.length > 0)
            response.status(200).send(result);
        else
            throw "No bookings found!";
    } catch (e) {
        response.status(404).send(e);
    }
}

module.exports = {
    getBookings
}
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

const saveBooking = async (request, response) => {

    try {

        let data = pick(request.body, ['placeId', 'userId', 'title', 'first_name', 'last_name', 'bookedFrom', 'bookedTill', 'guests']);
        let url = request.protocol + "://" + request.get('host') + "/images/" + request.file.filename;

        let booking = new Booking({
            ...data,
            imageUrl: url
        });

        let result = await booking.save();

        if (booking) {
            response.status(200).send({
                status: "The booking has been saved.",
                result: result
            });
        } else {
            throw "Error: The booking could not be saved.";
        }
    } catch (e) {
        response.status(400).send({
            status: "Error.",
            error: e
        });
    }
}

module.exports = {
    getBookings,
    saveBooking
}
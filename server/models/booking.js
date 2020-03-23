const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    placeId: {
        ref: 'Place',
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    },
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    bookedFrom: {
        type: Date,
        required: true
    },
    bookedTill: {
        type: Date,
        required: true
    },
    guests: {
        required: true,
        type: Number
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    Booking
}
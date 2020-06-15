const mongoose = require('mongoose');
const moment = require('moment');

const reviewSchema = new mongoose.Schema({
    rating: {
        required: true,
        type: Number
    },
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    placeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    message: {
        required: true,
        type: String
    },
    createdAt: {
        default: moment().format("MMM Do YY").toString(),
        type: String
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
    Review
}
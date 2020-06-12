const mongoose = require('mongoose');

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
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
    Review
}
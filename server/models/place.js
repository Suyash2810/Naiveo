const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableFrom: {
        type: Date,
        required: true
    },
    availableTill: {
        required: true,
        type: Date
    },
    user: {
        ref: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = {
    Place
}
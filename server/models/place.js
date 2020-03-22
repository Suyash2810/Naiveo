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
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    availableFrom: {
        required: true,
        type: Date
    },
    availableTill: {
        required: true,
        type: Date
    },
    user: {
        ref: mongoose.Schema.Types.ObjectId
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = {
    Place
}
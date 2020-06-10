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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visit: [
        {
            name: {
                required: true,
                type: String
            },
            price: {
                type: Number,
                required: true
            } 
        }
    ],
    ratings: [
        {
            required: true,
            type: Number
        }
    ]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = {
    Place
}
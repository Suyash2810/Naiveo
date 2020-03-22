const {
    Place
} = require('./../models/place');

const {
    pick
} = require('lodash');

const getPlaces = async (request, response) => {

    try {
        let places = await Place.find({});
        if (places.length > 0) {
            response.status(200).send(places);
        } else {
            throw "No places were found!"
        }
    } catch (e) {
        response.status(404).send(e);
    }
}

module.exports = {
    getPlaces
}
const {
    Place
} = require('./../models/place');

const {
    pick
} = require('lodash');

const {
    ObjectId
} = require('mongodb');

const getPlaces = async (request, response) => {

    try {
        let places = await Place.find({});
        if (places.length > 0) {
            response.status(200).send({
                status: "Places have been fetched.",
                result: places
            });
        } else {
            throw "No places were found!"
        }
    } catch (e) {
        response.status(404).send({
            status: "Error",
            error: e
        });
    }
}

const savePlace = async (request, response) => {

    try {
        let body = pick(request.body, ['title', 'description', 'price', 'availableFrom', 'availableTill', 'user']);
        let url = request.protocol + "://" + request.get('host') + '/images/' + request.file.filename;

        let place = new Place({
            title: body.title,
            description: body.description,
            price: Number(body.price),
            availableFrom: new Date(body.availableFrom),
            availableTill: new Date(body.availableTill),
            user: new ObjectId(body.user),
            imageUrl: url
        });


        let result = await place.save();


        if (result) {
            response.status(200).send({
                status: "The place has been saved.",
                result: result
            });
        } else {
            throw "Error: The place could not be saved.";
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

const getPlace = async (request, response) => {

    try {
        const id = request.params.id;
        const place = await Place.findById(id);
        if (place.length > 0) {
            response.status(200).send({
                status: "Place has been fetched.",
                result: place
            });
        } else {
            throw "Error: Place not found.";
        }
    } catch (e) {
        response.status(404).send({
            error: e
        })
    }
}

module.exports = {
    getPlaces,
    savePlace,
    getPlace
}
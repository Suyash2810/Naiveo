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
        let body = pick(request.body, ['title', 'description', 'price', 'availableFrom', 'availableTill', 'user', 'visit']);
        let url = request.protocol + "://" + request.get('host') + '/images/' + request.file.filename;

        let visit = JSON.parse(body.visit);

        let place = new Place({
            title: body.title,
            description: body.description,
            price: Number(body.price),
            availableFrom: new Date(body.availableFrom),
            availableTill: new Date(body.availableTill),
            user: new ObjectId(body.user),
            imageUrl: url,
            visit: visit
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
        const place = await Place.find({
            _id: id
        });
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

const updatePlace = async (request, response) => {

    try {
        const body = pick(request.body, ['id', 'title', 'description', 'price']);

        const result = await Place.findOneAndUpdate({
            _id: body.id
        }, {
            $set: {
                title: body.title,
                description: body.description,
                price: body.price
            }
        }, {
            new: true
        });

        if (result) {
            response.status(200).send({
                status: "Place has been updated.",
                result: result
            })
        } else {
            throw "Error: Place could not be updated.";
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

const deletePlace = async (request, response) => {

    try {
        if (request.user) {

            const id = request.params.id;
            const result = await Place.findOneAndDelete({
                _id: id
            });
            if (result) {
                response.status(200).send({
                    status: "The place has been deleted."
                });
            } else {
                throw "The place couldn\'t be deleted.";
            }
        } else {
            throw "The user isn\'t authenticated.";
        }
    } catch (e) {
        response.status(400).send(e);
    }
}

module.exports = {
    getPlaces,
    savePlace,
    getPlace,
    updatePlace,
    deletePlace
}
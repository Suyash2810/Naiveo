const {
    Review
} = require('../models/reviews');
const {
    pick
} = require('lodash');

const saveReview = async (request, response) => {

    try {

        let body = pick(request.body, ['placeId', 'userId', 'rating', 'message']);

        let review = new Review(body);
        let result = await review.save();
        if (result) {
            response.status(200).send({
                status: "Your review has been saved."
            });
        } else {
            throw "Review could not be saved.";
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

const getReviews = async (request, response) => {

    try {
        let placeId = request.params.placeId;
        let result = await Review.find({
            placeId
        });

        if (result) {
            response.status(200).send({
                status: "Reviews have been fetched.",
                result: result
            });
        } else {
            throw "Reviews could not be fetched.";
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

module.exports = {
    saveReview,
    getReviews
}
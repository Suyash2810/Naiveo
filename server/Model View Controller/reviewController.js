const {
    Review
} = require('../models/reviews');
const {
    pick
} = require('lodash');
const e = require('express');

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

const updateReview = async (request, response) => {

    try {
        const reviewId = request.params.reviewId;
        let body = pick(request.body, ['rating', 'message']);

        let result = await Review.updateOne({
            _id: reviewId
        }, {
            $set: body
        }, {
            new: true
        });
        if (result) {
            response.status(200).send({
                status: "Your review has been updated."
            });
        } else {
            throw "Review could not be updated."
        }
    } catch (e) {
        response.statsu(400).send({
            error: e
        });
    }
}

const deleteReview = async (request, response) => {

    try {
        const reviewId = request.params.reviewId;
        let result = await Review.deleteOne({
            _id: reviewId
        });

        if (result) {
            response.status(200).send({
                status: "Your review has been deleted."
            });
        } else {
            throw "Could not be deleted."
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

module.exports = {
    saveReview,
    getReviews,
    updateReview,
    deleteReview
}
const {
    pick
} = require("lodash");
const {
    Issue
} = require('../models/issue');

const addIssue = async (request, response) => {

    try {
        const data = pick(request.body, ['email', 'message', 'userId', 'offerId']);
        const issue = await new Issue({
            offer: data.offerId,
            user: data.userId,
            email: data.email,
            message: data.message
        });
        const result = await issue.save();
        if (result) {
            response.status(200).send({
                status: "Issue has been submitted."
            });
        } else throw "Issue could not be submitted.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const getIssues = async (request, response) => {

    try {
        const id = request.params.id;
        const result = await Issue.find({
            offer: id
        });
        if (result) {
            response.status(200).send({
                status: "Issues have been fetched.",
                issues: result
            });
        } else throw "Issues could not be fetched.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const getPopulatedIssues = async (request, response) => {

    try {
        const id = request.params.id;
        const result = await Issue.find({
            offer: id
        }).populate('user');
        if (result) {
            response.status(200).send({
                status: "Issues have been fetched.",
                issues: result
            });
        } else throw "Issues could not be fetched.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const deleteIssue = async (request, response) => {

    try {
        const id = request.params.id;
        const result = await Issue.findOneAndDelete({
            _id: id
        });

        if (result) {
            response.status(200).send({
                status: "Issue has been deleted."
            });
        } else throw "Issue could not be deleted.";
    } catch (e) {
        response.status(400).send(e);
    }
}

module.exports = {
    addIssue,
    getIssues,
    deleteIssue,
    getPopulatedIssues
}
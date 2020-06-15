const models = require('../models/index');

const {
    pick
} = require('lodash');
const {
    User
} = require('../models/user');

const register = async (request, response) => {

    try {
        let body = pick(request.body, ['username', 'email', 'password', 'identity']);
        let url = request.protocol + "://" + request.get('host') + '/images/' + request.file.filename;
        let user = new models.User({
            name: body.username,
            email: body.email,
            password: body.password,
            image: url,
            identity: body.identity
        });
        let result = await user.save();
        if (result) {
            response.status(200).send({
                status: `${result.name}, you have been registered.`,
                result: result
            });
        } else {
            throw "Couldn\'t register the user.";
        }
    } catch (e) {
        response.status(400).send(e);
    }
}

const login = async (request, response) => {

    try {
        let body = pick(request.body, ['email', 'password']);
        let user = await models.User.findByCredentials(body.email, body.password);
        if (user) {
            let token = await user.generateAuthToken();

            response.status(200).send({
                status: "User successfully logged in.",
                user: user,
                token: token,
                expireTime: 3600
            });
        } else {
            throw 'Error in logging.';
        }
    } catch (e) {
        response.status(400).send({
            status: "Error logging in!",
            result: e
        });
    }
}

const fetchUserData = async (request, response) => {

    try {
        if (request.user) {
            const user = await models.User.findOne({
                _id: request.user._id
            });
            if (user) {
                response.status(200).send({
                    status: "The user data has been fetched.",
                    result: user
                });
            } else {
                throw "Data could not be fetched.";
            }
        } else {
            throw "User is not authenticated.";
        }
    } catch (e) {
        response.status(404).send({
            error: e
        });
    }
}

const deleteAccount = async (request, response) => {

    try {
        if (request.user) {

            const result = models.User.findOneAndDelete({
                _id: request.user._id
            });

            await models.Place.deleteMany({
                user: request.user._id
            });
            await models.Booking.deleteMany({
                userId: request.user._id
            });

            if (result) {
                response.status(200).send({
                    status: "Your account has been deleted."
                });
            } else {
                throw "Accoutn couldn\'t be deleted.";
            }
        }
    } catch (e) {
        response.status(400).send({
            error: e
        });
    }
}

const fetchGuide = async (request, response) => {

    try {
        const id = request.params.id;
        let result = await User.findById({
            _id: id
        });
        if (result) {
            response.status(200).send({
                status: "The guide has been fetched.",
                guide: result
            });
        } else {
            throw "Guide could not be fetched.";
        }
    } catch (e) {
        response.status(404).send({
            error: e
        });
    }
}

module.exports = {
    register,
    login,
    fetchUserData,
    deleteAccount,
    fetchGuide
}
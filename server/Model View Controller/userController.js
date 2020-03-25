const {
    User
} = require('../models/user');

const {
    pick
} = require('lodash');

const register = async (request, response) => {

    try {
        let body = pick(request.body, ['username', 'email', 'password']);
        let url = request.protocol + "://" + request.get('host') + '/images/' + request.file.filename;
        let user = new User({
            name: body.username,
            email: body.email,
            password: body.password,
            image: url
        });
        let result = await user.save();
        if (result) {
            response.status(200).send(result);
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
        let user = await User.findByCredentials(body.email, body.password);
        if (user) {
            let token = await user.generateAuthToken();

            response.status(200).send({
                status: "User successfully logged in.",
                result: user,
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

module.exports = {
    register,
    login
}
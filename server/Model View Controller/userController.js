const {
    User
} = require('../models/user');

const {
    pick
} = require('lodash');

const register = async (request, response) => {

    try {
        const data = pick(request.body, ['name', 'email', 'password']);
        const user = new User(data);
        const result = await user.save();
        if (result) {
            response.status(200).send(result);
        } else {
            throw "Couldn\'t register the user.";
        }
    } catch (e) {
        response.status(400).send(e);
    }
}

module.exports = {
    register
}
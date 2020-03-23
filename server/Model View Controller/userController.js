const {
    User
} = require('../models/user');

const {
    pick
} = require('lodash');

const register = async (request, response) => {

    try {
        let body = pick(request.body, ['username', 'email', 'password']);
        console.log(body);
        let url = request.protocol + "://" + request.get('host') + '/images/' + request.file.filename;
        let user = new User({
            name: body.username,
            email: body.email,
            password: body.password,
            image: url
        });
        console.log(user);
        let result = await user.save();
        console.log(result);
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
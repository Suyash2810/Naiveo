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
        let user = await User.findByCredentials(body.email, body.password);
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
        if(request.user){
            const id = request.user._id;
            const user = await User.findOne({_id: id});
            if(user){
                response.status(200).send({
                    status: "The user data has been fetched.",
                    result: user
                });
            }else{
                throw "Data could not be fetched.";
            }
        }else {
            throw "User not authenticated.";
        }
    }catch(e) {
        response.status(404).send({
            error: e
        });
    }
}

module.exports = {
    register,
    login,
    fetchUserData
}
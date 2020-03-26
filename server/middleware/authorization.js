const jwt = require('jsonwebtoken');
const {
    User
} = require('../models/user');

const authorization = (request, response, next) => {

    let token = request.headers.authaccess;

    if (!token) {
        response.status(400).send({
            error: "User isn\'t authenticated."
        });
    } else {

        let userToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = userToken._id;

        User.findById(id)
            .then(
                user => {

                    if (!user) {
                        response.status(404).send({
                            error: "User not found."
                        });
                    } else {
                        request.user = user;
                        next();
                    }
                }
            )
            .catch(
                err => {
                    response.status(400).send({
                        status: "User not authenticated.",
                        error: err
                    });
                }
            );
    }
}

module.exports = {
    authorization
}
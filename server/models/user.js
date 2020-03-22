const mongoose = require('mongoose');
const validator = require('validator');
const {
    pick
} = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String
    }
});

userSchema.methods.toJSON = function () {

    var user = this;
    let obj = user.toObject();
    let data = pick(obj, ['name', 'email']);
    return data;
}

userSchema.methods.generateAuthToken = function () {

    var user = this;
    const access = "auth";
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    }).toString();

    return new Promise((resolve, reject) => {
        if (token)
            return resolve(token);
        else
            reject({
                err: "Token could not be created."
            });
    });
}

userSchema.pre('save', function (done) {

    var user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                done();
            });
        });
    } else {
        done();
    }
});

userSchema.statics.findByCredentials = function (email, password) {

    var User = this;

    return User.findOne(email)
        .then(user => {
            if (!user) {
                return Promise.reject("User not found.");
            } else {
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, function (err, result) {

                        if (result)
                            return resolve(user);
                        else
                            return reject(err);
                    });
                });
            }
        })
        .catch(err => {
            return Promise.reject("Err: User not found.", err);
        });
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
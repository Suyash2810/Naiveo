const mongoose = require('mongoose');
const validator = require('validator');

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
            message: 'Email is not valid.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
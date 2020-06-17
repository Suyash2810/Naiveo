const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    age: {
        required: true,
        type: Number
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    gender: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    }],
    tours: {
        default: 0,
        type: Number
    }
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = {
    UserInfo
}
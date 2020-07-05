const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "place"
    }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = {
    Issue
}
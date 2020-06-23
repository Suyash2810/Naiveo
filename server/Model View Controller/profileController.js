const {
    User,
    UserInfo
} = require('../models/index');

const fetchGuides = async (request, response) => {

    try {
        let result = await User.find({
            identity: 'tour guide'
        });
        if (result) {
            response.status(200).send({
                status: "Guides have been fetched",
                guides: result
            });
        } else {
            throw "No guides could be found.";
        }
    } catch (e) {
        response.status(404).send(e);
    }
}

const fetchGuide = async (request, response) => {

    try {
        const id = request.params.id;
        const result = await UserInfo.find({
            _id: id
        }).populate('user').populate('followers').populate('following').populate('offers').exec();
        if (result) {
            response.status(200).send({
                guide: result
            });
        } else {
            throw "The guide could nto be found.";
        }
    } catch (e) {
        response.status(404).send(e);
    }
}

module.exports = {
    fetchGuides,
    fetchGuide
}
const {
    User
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

module.exports = {
    fetchGuides
}
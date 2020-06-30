const {
    User,
    UserInfo
} = require('../models/index');
const {
    pick
} = require('lodash');

const {
    ObjectId
} = require('mongodb');

const usersInfo = async (request, response) => {

    try {
        let result = await User.find({
            identity: 'tour guide'
        });
        if (result) {
            response.status(200).send({
                status: "Guides have been fetched",
                infos: result
            });
        } else {
            throw "No guides could be found.";
        }
    } catch (e) {
        response.status(404).send(e);
    }
}

const userInfo = async (request, response) => {

    try {
        const id = request.params.id;
        const result = await UserInfo.find({
            user: id
        }).populate('user').populate('followers').populate('following').populate('offers').exec();

        if (result) {
            response.status(200).send({
                info: result
            });
        } else {
            throw "The guide could not be found.";
        }
    } catch (e) {
        response.status(404).send(e);
    }
}

const saveUserData = async (request, response) => {

    try {
        let body = pick(request.body, ['address', 'description', 'dob', 'gender', 'mobile']);
        body = {
            ...body,
            user: request.params.id
        };

        console.log(body);
        const userinfo = await new UserInfo(body);
        const result = await userinfo.save();
        if (result) {
            response.status(200).send({
                status: "User data has been saved."
            });
        } else {
            throw "User data could not be saved."
        }
    } catch (e) {
        response.status(400).send(e);
    }
}

const updateUserData = async (request, response) => {

    try {
        const id = request.params.id;
        let body = pick(request.body, ['address', 'description', 'dob', 'gender', 'mobile']);
        const result = await UserInfo.findOneAndUpdate({
            user: id
        }, {
            $set: body
        }, {
            new: true
        });
        if (result) {
            console.log(result);
            response.status(200).send({
                status: "Data has been updated."
            });
        } else throw "Data could not be updated.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const follow = async (request, response) => {

    try {
        const activeUserId = request.params.id;
        const {
            id
        } = pick(request.body, ['id']);

        const result = await UserInfo.findOneAndUpdate({
            user: activeUserId
        }, {
            $push: {
                following: id
            }
        }, {
            new: true
        });
        if (result) {
            const res = await UserInfo.findOneAndUpdate({
                user: id
            }, {
                $push: {
                    followers: activeUserId
                }
            }, {
                new: true
            });

            if (res) {
                response.status(200).send({
                    status: "Followed."
                });
            } else throw "Unknown error.";
        } else throw "Following could not be updated.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const unfollow = async (request, response) => {

    try {
        const activeUserId = request.params.id;
        const {
            id
        } = pick(request.body, ['id']);

        const result = await UserInfo.update({
            user: activeUserId
        }, {
            $pull: {
                following: ObjectId(id)
            }
        }, {
            new: true
        });

        if (result) {
            const res = await UserInfo.findOneAndUpdate({
                user: id
            }, {
                $pull: {
                    followers: activeUserId
                }
            }, {
                new: true
            });

            if (res) {
                response.status(200).send({
                    status: "Unfollowed."
                });
            } else throw "Unknown error.";
        } else throw "Following could not be updated.";
    } catch (e) {
        response.status(400).send(e);
    }
}

const getFollowing = async (request, response) => {

    try {
        const id = request.params.id;
        console.log(id);
        const result = await UserInfo.aggregate().match({
            user: ObjectId(id)
        }).project({
            following: 1
        }).unwind("following").lookup({
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following"
        }).unwind("following").group({
            "_id": null,
            "following": {
                $push: "$following"
            }
        });
        if (result) {
            response.status(200).send(result[0]);
        } else throw "User data could not be found.";

    } catch (e) {
        response.status(404).send(e);
    }
}

module.exports = {
    usersInfo,
    userInfo,
    saveUserData,
    updateUserData,
    follow,
    unfollow,
    getFollowing
}
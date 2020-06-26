const {
    UserInfo
} = require('../../../models/userinfo');

const expect = require('chai').expect;
const {
    ObjectId
} = require('mongodb');

describe("UserInfo Model Tests", () => {

    it("should not create the instance for invalid data", (done) => {

        const userInfo = new UserInfo();

        userInfo.validate(
            (error) => {
                expect(error.errors.user).to.exist;
                expect(error.errors.dob).to.exist;
                expect(error.errors.gender).to.exist;
                expect(error.errors.mobile).to.exist;
                expect(error.errors.address).to.exist;
                expect(error.errors.description).to.exist;
            }
        );

        done();
    });

    it("should create the instance for valid data", (done) => {

        const data = {
            user: new ObjectId(),
            dob: new Date(),
            gender: "Female",
            mobile: "1245",
            address: "foo",
            description: "foofoo",
            tours: 12,
            offers: [new ObjectId(), new ObjectId],
            followers: [new ObjectId(), new ObjectId],
            following: [new ObjectId(), new ObjectId]
        }

        const userinfo = new UserInfo(data);

        expect(userinfo).to.have.property('user').to.be.equal(data.user);
        expect(userinfo).to.have.property('dob').to.be.equal(data.dob);
        expect(userinfo).to.have.property('gender').to.be.equal(data.gender);
        expect(userinfo).to.have.property('mobile').to.be.equal(data.mobile);
        expect(userinfo).to.have.property('address').to.be.equal(data.address);
        expect(userinfo).to.have.property('description').to.be.equal(data.description);
        expect(userinfo.offers.length).to.be.equal(2);
        expect(userinfo.following.length).to.be.equal(2);
        expect(userinfo.followers.length).to.be.equal(2);
        done();
    });
});
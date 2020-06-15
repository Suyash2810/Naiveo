const expect = require("chai").expect;
const {
    Review
} = require('../../../models/reviews');
const {
    ObjectId
} = require('mongodb');

describe("Review Model Tests", () => {

    it("should not create an invalid instance", (done) => {

        let review = new Review();

        review.validate((error) => {

            expect(error.errors.rating).to.exist;
            expect(error.errors.place).to.exist;
            expect(error.errors.user).to.exist;
            expect(error.errors.message).to.exist;

            done();
        });
    });

    it("should create the instance for valid data", (done) => {

        let data = {
            rating: 5,
            place: new ObjectId(),
            user: new ObjectId(),
            message: "foo",
            createdAt: "June 10th, 19"
        }

        let review = new Review(data);

        expect(review).to.have.property('rating').to.be.equal(5);
        expect(review).to.have.property('place').to.be.equal(data.place);
        expect(review).to.have.property('user').to.be.equal(data.user);
        expect(review).to.have.property('message').to.be.equal(data.message);
        expect(review).to.have.property('createdAt').to.be.equal(data.createdAt);

        done();
    });
});
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
            expect(error.errors.placeId).to.exist;
            expect(error.errors.userId).to.exist;
            expect(error.errors.message).to.exist;

            done();
        });
    });

    it("should create the instance for valid data", (done) => {

        let data = {
            rating: 5,
            placeId: new ObjectId(),
            userId: new ObjectId(),
            message: "foo"
        }

        let review = new Review(data);

        expect(review).to.have.property('rating').to.be.equal(5);
        expect(review).to.have.property('placeId').to.be.equal(data.placeId);
        expect(review).to.have.property('userId').to.be.equal(data.userId);
        expect(review).to.have.property('message').to.be.equal(data.message);

        done();
    });
});
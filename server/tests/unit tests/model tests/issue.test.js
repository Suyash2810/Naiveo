const expect = require("chai").expect;
const {
    ObjectId
} = require('mongodb');

const {
    Issue
} = require("../../../models/issue");

describe("Issue Model Test", () => {

    it("should not create an invalid instance", (done) => {

        const issue = new Issue();

        issue.validate(
            error => {
                expect(error.errors.email).to.exist;
                expect(error.errors.message).to.exist;
                expect(error.errors.user).to.exist;
                expect(error.errors.offer).to.exist;
            }
        );

        done();
    });

    it("should create an instance for valid data", (done) => {

        const issue = new Issue({
            email: "foo@xyz.com",
            message: "foo",
            offer: new ObjectId(),
            user: new ObjectId()
        });

        expect(issue).to.have.property("email").to.be.equal(issue.email);
        expect(issue).to.have.property("message").to.be.equal(issue.message);
        expect(issue).to.have.property("offer").to.be.equal(issue.offer);
        expect(issue).to.have.property("user").to.be.equal(issue.user);

        done();
    });
});
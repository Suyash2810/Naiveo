const {
    User
} = require('../../../models/user');

const expect = require('chai').expect;

describe("User Model Test", () => {

    it("it should not create the instance for invalid data", (done) => {

        const user = new User();

        user.validate((error) => {

            expect(error.errors.name).to.exist;
            expect(error.errors.email).to.exist;
            expect(error.errors.password).to.exist;
            expect(error.errors.identity).to.exist;
        });

        done();
    });

    it("should create the instance for valid data", (done) => {

        const user = new User({
            name: "foo",
            email: "foo@xyz.com",
            password: "xyz",
            image: "/images",
            identity: "user"
        });

        expect(user).to.have.property('name').to.be.equal('foo');
        expect(user).to.have.property('email').to.be.equal('foo@xyz.com');
        expect(user).to.have.property('password').to.be.equal('xyz');
        expect(user).to.have.property('image').to.be.equal('/images');
        expect(user).to.have.property('identity').to.be.equal('user');
        done();
    });
});
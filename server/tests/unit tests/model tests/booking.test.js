const {
    Booking
} = require('../../../models/booking');

const {
    ObjectId
} = require('mongodb');

const expect = require('chai').expect;

describe("Booking Model Test", () => {

    it("it should not create the instance for invalid data", (done) => {

        const booking = new Booking();

        booking.validate((error) => {

            expect(error.errors.title).to.exist;
            expect(error.errors.first_name).to.exist;
            expect(error.errors.last_name).to.exist;
            expect(error.errors.imageUrl).to.exist;
            expect(error.errors.bookedFrom).to.exist;
            expect(error.errors.bookedTill).to.exist;
            expect(error.errors.guests).to.exist;
        });

        done();
    });

    it("should create the instance for valid data", (done) => {

        let data = {
            title: "foo",
            imageUrl: "/images",
            guests: 5,
            first_name: "fi",
            last_name: "fiifoo",
            bookedFrom: new Date(),
            bookedTill: new Date(),
            placeId: new ObjectId(),
            userId: new ObjectId()
        };

        const booking = new Booking(data);

        expect(booking).to.have.property('title').to.be.equal('foo');
        expect(booking).to.have.property('guests').to.be.equal(5);
        expect(booking).to.have.property('imageUrl').to.be.equal('/images');
        expect(booking).to.have.property('first_name').to.be.equal("fi");
        expect(booking).to.have.property('last_name').to.be.equal("fiifoo");
        expect(booking).to.have.property('bookedFrom').to.be.equal(data.bookedFrom);
        expect(booking).to.have.property('bookedTill').to.be.equal(data.bookedTill);
        expect(booking).to.have.property('placeId').to.be.equal(data.placeId);
        expect(booking).to.have.property('userId').to.be.equal(data.userId);
        done();
    });
});
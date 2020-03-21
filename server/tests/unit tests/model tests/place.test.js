const {
    Place
} = require('../../../models/place');

const {
    ObjectId
} = require('mongodb');

const expect = require('chai').expect;

describe("Place Model Test", () => {

    it("it should not create the instance for invalid data", (done) => {

        const place = new Place();

        place.validate((error) => {

            expect(error.errors.title).to.exist;
            expect(error.errors.description).to.exist;
            expect(error.errors.imageUrl).to.exist;
            expect(error.errors.price).to.exist;
            expect(error.errors.availableFrom).to.exist;
            expect(error.errors.availableTill).to.exist;
            expect(error.errors.user).to.exist;
        });

        done();
    });

    it("should create the instance for valid data", (done) => {

        let place = {
            title: "foo",
            description: "foofoo",
            imageUrl: "/images",
            price: 124.23,
            availableFrom: new Date(),
            availableTill: new Date(),
            user: new ObjectId()
        };

        const place = new Place(place);

        expect(place).to.have.property('title').to.be.equal('foo');
        expect(place).to.have.property('description').to.be.equal('foofoo');
        expect(place).to.have.property('imageUrl').to.be.equal('/images');
        expect(place).to.have.property('price').to.be.equal(124.23);
        expect(place).to.have.property('availableFrom').to.be.equal(place.availableFrom);
        expect(place).to.have.property('availableTill').to.be.equal(place.availableTill);
        expect(place).to.have.property('user').to.be.equal(place.user);
        done();
    });
});
export interface Bookable {
    id: string;
    placeId: string;
    userId: string;
    title: string;
    imageUrl: string;
    first_name: string;
    last_name: string;
    bookedFrom: Date;
    bookedTill: Date;
    guests: number;
    locations: Array<{ id: string, name: string, price: number }>
}

export class Booking {

    constructor(
        public placeId: string, public userId: string, public title: string,
        public imageUrl: string, public first_name, public last_name,
        public bookedFrom: Date, public bookedTill: Date, public guests: number,
        public locations: Array<{ name: string, price: number }>) {

        this.placeId = placeId;
        this.userId = userId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bookedFrom = bookedFrom;
        this.bookedTill = bookedTill;
        this.guests = guests;
        this.locations = locations;
    }
}
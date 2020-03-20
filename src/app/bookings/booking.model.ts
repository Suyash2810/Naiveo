export interface Bookable {
    id: string;
    placeId: string;
    userId: string;
    title: string;
    description: string;
    price: number;
    bookedFrom: Date;
    bookedTill: Date;
    guestNumber: number;
}

export class Booking implements Bookable {

    constructor(public id: string,
        public placeId: string, public userId: string, public title: string,
        public description: string, public price: number, public bookedFrom: Date, public bookedTill: Date,
        public guestNumber: number) {
        this.id = id;
        this.placeId = placeId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.bookedFrom = bookedFrom;
        this.bookedTill = bookedTill;
        this.guestNumber = guestNumber;
    }
}
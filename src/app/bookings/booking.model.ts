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
    guestNumber: number;
}

export class Booking implements Bookable {

    constructor(public id: string,
        public placeId: string, public userId: string, public title: string, public imageUrl: string, public first_name, public last_name, public bookedFrom: Date, public bookedTill: Date,
        public guestNumber: number) {
        this.id = id;
        this.placeId = placeId;
        this.userId = userId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bookedFrom = bookedFrom;
        this.bookedTill = bookedTill;
        this.guestNumber = guestNumber;
    }
}
export interface Bookable {
    id: string;
    placeId: string;
    userId: string;
    placeTitle: string;
    guestNumber: number;
}

export class Booking {

    constructor(public id: string, public placeId: string, public userId: string, public placeTitle: string, public guestNumber: number) {
        this.id = id;
        this.placeId = placeId;
        this.userId = userId;
        this.placeTitle = placeTitle;
        this.guestNumber = guestNumber;
    }
}
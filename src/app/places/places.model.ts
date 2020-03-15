export interface Place {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    availableFrom: Date;
    availableTill: Date;
    userID: string;
}

export class Place implements Place {

    id: string; title: string; description: string; imageUrl: string; price: number; availableFrom: Date;
    availableTill: Date; userID: string

    constructor(id, title, description, imageUrl, price, availableFrom, availableTill, userID) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.availableFrom = availableFrom;
        this.availableTill = availableTill;
        this.userID = userID;
    }
}
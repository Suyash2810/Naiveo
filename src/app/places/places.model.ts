export interface Place {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}

export class Place implements Place {

    id: string; title: string; description: string; imageUrl: string; price: number;

    constructor(id, title, description, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}
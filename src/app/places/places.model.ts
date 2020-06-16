export interface Place {

    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    availableFrom: Date;
    availableTill: Date;
    userID: string;
    visit: Array<{ id: string, name: string, price: number }>;
}
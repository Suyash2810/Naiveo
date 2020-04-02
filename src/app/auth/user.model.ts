export interface User {

    id: string;
    name: string;
    email: string;
    image: string;
}

export class User implements User {

    constructor(id: string, name: string, email: string, image: string) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
    }
}
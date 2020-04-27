export interface User {

    id: string;
    name: string;
    email: string;
    image: string;
    identity: string;
}

export class User implements User {

    constructor(id: string, name: string, email: string, image: string, identity: string) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.identity = identity;
    }
}
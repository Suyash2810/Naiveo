export interface User {

    id: string;
    name: String;
    email: string;
}

export class User implements User {

    constructor(id: string, name: string, email: string) {

        this.id = id;
        this.name = name;
        this.email = email;
    }
}
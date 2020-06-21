import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient) {

    }

    fetchGuides() {
        type responseType = { status: string, guides: any };
        return this.httpClient.get<responseType>("http://localhost:3000/guides");
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

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

    fetchGuideById(id: string) {

        type responseType = { status: string, guide: any };
        const req = new HttpRequest("GET", "http://localhost:3000/guide/" + id);
        return this.httpClient.request(req);
    }
}
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Issue } from './offer-issues.model';

export class IssueService {

    issues = new Subject<Issue[]>();

    constructor(private toastController: ToastController, private alertController: AlertController, private httpClient: HttpClient) {

    }

    addIssue(userId: string, offerId: string, email: string, message: string) {
        const data = { userId, offerId, email, message };
        const request = new HttpRequest('POST', "http://localhost:3000/issue", data);
        return this.httpClient.request(request);
    }

    fetchIssues(placeId: string) {
        const request = new HttpRequest('GET', "http://localhost/issues/" + placeId);
        return this.httpClient.request(request);
    }

    getIssues() {
        return this.issues.asObservable();
    }

    deleteIssue(id: string) {
        const request = new HttpRequest("DELETE", "http://localhost:3000/issue" + id);
        return this.httpClient.request(request);
    }
}
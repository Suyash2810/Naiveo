import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Issue } from './offer-issues.model';

export class IssueService {

    issues = new Subject<Issue[]>();

    constructor(private toastController: ToastController, private alertController: AlertController, private httpClient: HttpClient) {

    }

    addIssue(userId: string, offerId: string, email: string, message: string) {
        const data = { userId, offerId, email, message };
        const request = new HttpRequest('POST', "http://localhost:3000/issue", data, {
            responseType: 'json'
        });

        this.httpClient.request(request).subscribe(
            async (response: HttpResponse<{ status: string }>) => {
                if (response.body) {
                    const toast = this.toastController.create({
                        message: response.body.status,
                        duration: 2000
                    });

                    (await toast).present();
                }
            },
            async error => {
                const alert = this.alertController.create({
                    header: 'Error',
                    message: error.error,
                    buttons: ['Ok']
                });

                (await alert).present();
            }
        );
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
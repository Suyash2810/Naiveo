import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Issue } from './offer-issues.model';
import { map } from 'rxjs/operators';

export class IssueService {

    issues = new Subject<Issue[]>();
    populateIssues = new Subject<Array<any>>();

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
                let alert;

                if (error.error.errors.email.properties.message) {
                    alert = this.alertController.create({
                        header: 'Error',
                        message: error.error.errors.email.properties.message,
                        buttons: ['Ok']
                    });
                } else {
                    alert = this.alertController.create({
                        header: 'Error',
                        message: error.error,
                        buttons: ['Ok']
                    });
                }

                (await alert).present();
            }
        );
    }

    fetchIssues(placeId: string) {
        const request = new HttpRequest('GET', "http://localhost:3000/issues/" + placeId);
        this.httpClient.request(request)
            .pipe(
                map(
                    (response: HttpResponse<{ status: string, issues: any }>) => {
                        if (response.body) {
                            return response.body.issues.map(issue => {
                                return {
                                    id: issue._id,
                                    email: issue.email,
                                    message: issue.message,
                                    offerId: issue.offer,
                                    userId: issue.user
                                }
                            })
                        }
                    }
                )
            )
            .subscribe(
                (issues: Issue[]) => {
                    this.issues.next(issues);
                },
                async () => {
                    const alert = this.alertController.create({
                        header: 'Error',
                        message: "Issues could not be fetched.",
                        buttons: ['Ok']
                    });

                    (await alert).present();
                }
            );
    }

    fetchPopulatedIssues(placeId: string) {

        const request = new HttpRequest('GET', "http://localhost:3000/populateIssues/" + placeId);
        this.httpClient.request(request)
            .subscribe(
                (response: HttpResponse<{ status: string, issues: any }>) => {
                    if (response.body) {
                        this.populateIssues.next(response.body.issues);
                    }
                },
                async () => {
                    const alert = this.alertController.create({
                        header: 'Error',
                        message: "Issues could not be fetched.",
                        buttons: ['Ok']
                    });

                    (await alert).present();
                }
            );
    }

    getIssues() {
        return this.issues.asObservable();
    }

    getPopulatedIssues() {
        return this.populateIssues.asObservable();
    }

    deleteIssue(id: string) {
        const request = new HttpRequest("DELETE", "http://localhost:3000/issue/" + id);
        return this.httpClient.request(request);
    }
}
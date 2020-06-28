import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient, private toastController: ToastController, private alertController: AlertController) {

    }

    fetchGuides() {

        type responseType = { status: string, guides: any };
        return this.httpClient.get<responseType>("http://localhost:3000/guides");
    }

    fetchGuideById(id: string) {

        type responseType = { guide: any };
        return this.httpClient.get<responseType>(`http://localhost:3000/guide/${id}`);
    }

    saveUserData(id: string, address: string, description: string, dob: Date, gender: string, mobile: string) {

        type responseType = { status: string };
        const data = {
            address, description, dob, gender, mobile
        }

        this.httpClient.post<responseType>("http://localhost:3000/saveUserData/" + id, data)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        duration: 2000,
                        message: response.status
                    });

                    await toast.present();
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: error.errors._message,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    updateUserData(id: string, address: string, description: string, dob: Date, gender: string, mobile: string) {

        type responseType = { status: string };
        const data = {
            address, description, dob, gender, mobile
        }

        this.httpClient.patch<responseType>("http://localhost:3000/updateUserData/" + id, data)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        duration: 2000,
                        message: response.status
                    });

                    await toast.present();
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: error.errors._message,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    follow(id: string, activeUserId: string) {

        type responseType = { status: string };
        const data = {
            id
        }

        return this.httpClient.patch<responseType>(`http://localhost:3000/follow/${activeUserId}`, data);
    }

    unfollow(id: string, activeUserId: string) {

        type responseType = { status: string };
        const data = {
            id
        }

        return this.httpClient.patch<responseType>(`http://localhost:3000/unfollow/${activeUserId}`, data);
    }
}
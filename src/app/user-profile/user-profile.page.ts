import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {

  user: User;
  isLoading: boolean = true;
  userSub: Subscription;
  deleteSub: Subscription;

  constructor(private authService: AuthService, private alertController: AlertController,
    private loadingController: LoadingController, private toastController: ToastController,
    private navController: NavController) { }

  ionViewWillEnter() {
    this.authService.fetchUser();
  }

  ionViewDidEnter() {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.userSub = this.authService._getUser().subscribe(
      (user) => {
        this.user = user;
        this.isLoading = false;
      }
    );
  }

  async deleteAccount() {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you <strong>sure</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.alertController.create({
              header: "Deactivate!",
              message: "You can deactivate your account instead!",
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel'
                },
                {
                  text: 'Okay',
                  handler: () => {
                    console.log("Deactivating Account.");
                  }
                },
                {
                  text: 'Delete',
                  handler: () => {
                    this.loadingController.create({
                      message: 'Deleting...',
                      keyboardClose: true
                    }).then(loader => {
                      loader.present();
                      this.authService.deleteAccount().subscribe(
                        result => {
                          this.toastController.create({
                            message: result.status,
                            duration: 2000
                          }).then(toast => {
                            toast.present();
                            loader.dismiss();
                            this.authService.logout();
                          });
                        }
                      )
                    });
                  }
                }
              ]
            }).then(alert => {
              alert.present();
            })
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToDetailPage() {
    this.navController.navigateForward('/user/detail-page/' + this.user.id);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {

  user: User;
  isLoading: boolean = false;
  userSub: Subscription;

  constructor(private authService: AuthService, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.isLoading = true;
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

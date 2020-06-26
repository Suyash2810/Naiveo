import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user-profile/user-profile.service';
import { NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  id: string;
  userData: any;
  userSubscription: Subscription;
  todayDate: String = new Date().toISOString();

  constructor(private authService: AuthService, private profileService: UserService, private navController: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.authService.getUserId();
    this.userSubscription = this.profileService.fetchGuideById(this.id)
      .subscribe(
        response => {
          console.log(response);
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error,
            buttons: ['OK']
          });

          await alert.present();
        }
      )
  }

  onDismiss() {
    this.navController.navigateBack('/places');
  }

}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user-profile/user-profile.service';
import { NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit, OnDestroy {

  id: string;
  userData: any;
  userSubscription: Subscription;
  todayDate: String = new Date().toISOString();
  isLoading: boolean = true;
  dataExists: boolean = true;

  @ViewChild('f', null) form: NgForm;

  constructor(private authService: AuthService, private profileService: UserService, private navController: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.authService.getUserId();
    this.userSubscription = this.profileService.fetchUserInfo(this.id)
      .subscribe(
        response => {
          if (response.guide.length == 0) {
            this.dataExists = false;
          }
          this.userData = response.guide[0];
          this.isLoading = false;
          if (response.guide.length != 0) {
            setTimeout(() => {
              this.form.setValue({
                description: this.userData.description,
                address: this.userData.address,
                dob: this.userData.dob,
                mobile: this.userData.mobile,
                gender: this.userData.gender
              });
            });
          }
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error,
            buttons: ['OK']
          });

          await alert.present();
        }
      );
  }

  onDismiss() {
    this.navController.navigateBack('/places');
  }

  onSubmit() {
    if (this.dataExists) {
      this.profileService.updateUserData(this.id, this.form.value.address, this.form.value.description, this.form.value.dob, this.form.value.gender, this.form.value.mobile);
    } else {
      this.profileService.saveUserData(this.id, this.form.value.address, this.form.value.description, this.form.value.dob, this.form.value.gender, this.form.value.mobile);
      this.form.reset();
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

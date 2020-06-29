import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from "@ionic/core";
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.page.html',
  styleUrls: ['./follow-page.page.scss'],
})
export class FollowPagePage implements OnInit, OnDestroy {

  userId: string;
  userData: any;
  userSubscription: Subscription;
  segment: string = "following";
  isLoading: boolean = true;

  constructor(private profileService: UserService, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userSubscription = this.profileService.fetchUserInfo(this.userId)
      .subscribe(
        (response) => {
          if (response.info.length != 0) {
            this.userData = response.info[0];
            console.log(this.userData);
            this.isLoading = false;
          } else {
            this.userData = null;
          }
        },
        async error => {
          const alert = await this.alertController.create({
            header: "Error",
            message: error,
            buttons: ['Ok']
          });

          await alert.present();
        }
      );
  }


  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

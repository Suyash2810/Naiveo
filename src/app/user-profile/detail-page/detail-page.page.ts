import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit, OnDestroy {

  userinfo: any;
  id: string;
  activeUserId: string;
  guideSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private profileService: UserService,
    private alertController: AlertController, private authService: AuthService,
    private toastController: ToastController, private navController: NavController) { }

  ngOnInit() {
    this.activeUserId = this.authService.getUserId();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.guideSubscription = this.profileService.fetchUserInfo(this.id).subscribe(
          (response) => {
            this.userinfo = response.info[0];
            this.isLoading = false;
            console.log(this.userinfo);
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
    );
  }

  follow() {
    this.profileService.follow(this.id, this.activeUserId)
      .subscribe(
        async response => {
          const toast = this.toastController.create({
            duration: 2000,
            message: response.status
          });

          (await toast).present();
        },
        async error => {
          const alert = await this.alertController.create({
            header: "Error",
            message: error,
            buttons: ["Ok"]
          });

          alert.present();
        }
      );
  }

  unfollow() {
    this.profileService.unfollow(this.id, this.activeUserId)
      .subscribe(
        async response => {
          const toast = this.toastController.create({
            duration: 2000,
            message: response.status
          });

          (await toast).present();
        },
        async error => {
          const alert = await this.alertController.create({
            header: "Error",
            message: error,
            buttons: ["Ok"]
          });

          alert.present();
        }
      );
  }

  navigateBack() {
    this.navController.navigateBack('/user')
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }
}

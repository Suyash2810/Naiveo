import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit, OnDestroy {

  guide: any;
  id: string;
  activeUserId: string;
  guideSubscription: Subscription;

  constructor(private route: ActivatedRoute, private profileService: UserService,
    private alertController: AlertController, private authService: AuthService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.activeUserId = this.authService.getUserId();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.guideSubscription = this.profileService.fetchGuideById(this.id).subscribe(
          (response) => {
            this.guide = response.guide;
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
            message: error.errors._message,
            buttons: ["Ok"]
          })
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
            message: error.errors._message,
            buttons: ["Ok"]
          })
        }
      );
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Bookable } from 'src/app/bookings/booking.model';
import { BookingService } from 'src/app/bookings/booking.service';

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
  bookings: Array<Bookable> = [];
  bookingSubscription: Subscription;

  constructor(private route: ActivatedRoute, private profileService: UserService,
    private alertController: AlertController, private authService: AuthService,
    private toastController: ToastController, private navController: NavController,
    private bookingService: BookingService) { }

  ngOnInit() {
    this.activeUserId = this.authService.getUserId();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.guideSubscription = this.profileService.fetchUserInfo(this.id).subscribe(
          (response) => {
            this.userinfo = response.info[0];
            if (this.userinfo.user.identity == "user") {
              this.bookingService.getBookingsByUserId(this.id);
              this.bookingSubscription = this.bookingService._getBookings().subscribe(
                (bookings: Bookable[]) => {
                  this.bookings = bookings;
                  this.isLoading = false;
                }
              )
            } else { this.isLoading = false; }
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
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}

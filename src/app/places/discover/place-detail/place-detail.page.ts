import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ReviewsComponent } from './reviews/reviews.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  constructor(private nvCntrl: NavController, private route: ActivatedRoute, private placeService: PlacesService,
    private modalCntrl: ModalController, private actionSheetCntrl: ActionSheetController,
    private bookingService: BookingService, private authService: AuthService) { }

  private place: Place;
  private placeSub: Subscription;
  private isBookable: boolean;
  private userId: string;
  private username: string;
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUsername();
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['placeID'];
        if (!id) {
          this.nvCntrl.navigateBack('/places/tabs/discover');
        } else {
          this.placeService.getPlaceById(id);
          this.place = this.placeService.get_place();
          this.placeSub = this.placeService._get_place()
            .subscribe((place: Place) => {
              this.place = place;
              this.isLoading = false;
              this.isBookable = this.place.userID != this.authService.getUserId();
            });
        }
      }
    )
  }

  bookPlace() {
    // this.nvCntrl.navigateBack('/places/tabs/discover');
    this.actionSheetCntrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Select Date',
        handler: () => {
          this.openBookingModal('select');
        }
      }, {
        text: 'Random Date',
        handler: () => {
          this.openBookingModal('random');
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    })
      .then(sheet => {
        sheet.present();
      });
  }

  openBookingModal(data: 'select' | 'random') {

    this.modalCntrl.create({
      component: CreateBookingComponent, componentProps: {
        selectedPlace: this.place,
        selectedMode: data
      }
    }).then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(resultData => {
        if (resultData.role === "confirm") {
          const data = resultData.data.message;
          this.bookingService.addBooking(this.place.id, this.place.title, this.place.imageUrl, data.first_name,
            data.last_name, data.fromDate, data.tillDate, data.guests);
        }
      });
  }

  async openReview() {
    const model = await this.modalCntrl.create({
      component: ReviewsComponent,
      componentProps: {
        placeId: this.place.id,
        placeName: this.place.title,
        userId: this.userId
      }
    });

    await model.present();
  }

  navigateBack() {
    this.nvCntrl.navigateBack('/places/tabs/discover');
  }

  deletePlace(id: string) {

    this.actionSheetCntrl.create({
      header: 'Places',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.placeService.deletePlace(id);
          this.navigateBack();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    }).then(sheet => sheet.present());
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

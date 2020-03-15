import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private nvCntrl: NavController, private route: ActivatedRoute, private placeService: PlacesService,
    private modalCntrl: ModalController, private actionSheetCntrl: ActionSheetController) { }

  private place: Place;

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        let id = params['placeID'];
        if (!id) {
          this.nvCntrl.navigateBack('/places/tabs/discover');
        } else {
          this.place = this.placeService.getPlaceById(id);
          this.placeService.get_placeById().subscribe(place => this.place = place)
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
    console.log(data);

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
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          console.log("Booked.");
        }
      });
  }
}

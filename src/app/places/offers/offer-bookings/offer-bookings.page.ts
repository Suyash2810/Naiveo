import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place: Place;

  constructor(private route: ActivatedRoute, private nvCtrl: NavController, private placeService: PlacesService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        console.log(id);
        if (!id) {
          this.nvCtrl.navigateBack('/places/tabs/offers');
        } else {
          this.place = this.placeService.getPlaceById(id);
          this.placeService.get_placeById().subscribe(offer => this.place = offer);
          console.log(this.place);
        }
      }
    )
  }
}

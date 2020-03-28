import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: Place;
  offerSub: Subscription;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private nvCtrl: NavController, private placeService: PlacesService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.isLoading = true;
        let id = params['id'];
        if (!id) {
          this.nvCtrl.navigateBack('/places/tabs/offers');
        } else {
          this.placeService.getPlaceById(id);
          this.place = this.placeService.get_place();
          this.offerSub = this.placeService._get_place().subscribe(offer => { this.place = offer; this.isLoading = false; });
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
}

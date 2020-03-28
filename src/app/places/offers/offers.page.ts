import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[] = [];
  offerSub: Subscription;
  isLoading: boolean = false;

  constructor(private placeService: PlacesService, private router: Router) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placeService.fetchPlaces();
  }

  ngOnInit() {
    this.offers = this.placeService.get_places();
    this.offerSub = this.placeService._get_places().subscribe(offers => {
      this.offers = offers;
      this.isLoading = false;
    });
  }

  onEdit(id: string, slidItem: IonItemSliding) {
    slidItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }

  ngOnDestroy() {
    this.offerSub.unsubscribe();
  }
}

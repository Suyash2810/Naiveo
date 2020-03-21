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

  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.offers = this.placeService.fetchPlaces();
    this.offerSub = this.placeService.get_places().subscribe(offers => this.offers = offers);
  }

  onEdit(id: number, slidItem: IonItemSliding) {
    slidItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }

  ngOnDestroy() {
    this.offerSub.unsubscribe();
  }
}

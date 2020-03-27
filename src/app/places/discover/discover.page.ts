import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  private fetchedPlaces: Place[] = [];
  private filterPlaces: Place[] = [];
  private placeSub: Subscription;
  isLoading: boolean = false;
  tab: boolean = true;

  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces();
  }

  ngOnInit() {
    this.fetchedPlaces = this.placesService.get_places();
    this.filterPlaces = this.fetchedPlaces;
    this.placeSub = this.placesService._get_places().subscribe(
      (places) => {
        this.fetchedPlaces = places;
        this.filterPlaces = this.fetchedPlaces;
        this.isLoading = false;
      }
    )
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    if (event.detail.value === 'all') {
      this.filterPlaces = this.fetchedPlaces;
    }
    else {
      this.tab = false;
      this.filterPlaces = this.fetchedPlaces.filter(place => place.userID != this.authService.getUserId());
    }
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

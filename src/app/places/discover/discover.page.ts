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

  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchedPlaces = this.placesService.fetchPlaces();
    this.filterPlaces = this.fetchedPlaces;
    this.placeSub = this.placesService.get_places().subscribe(
      (places) => {
        this.fetchedPlaces = places;
        this.filterPlaces = this.fetchedPlaces;
      }
    )
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    if (event.detail.value === 'all') {
      this.filterPlaces = this.fetchedPlaces;
    }
    else {
      this.filterPlaces = this.fetchedPlaces.filter(place => place.userID != this.authService.getUserId());
    }
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

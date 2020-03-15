import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  private fetchedPlaces: Place[] = [];
  private placeSub: Subscription;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.fetchedPlaces = this.placesService.fetchPlaces();
    this.placeSub = this.placesService.get_places().subscribe(
      (places) => {
        this.fetchedPlaces = places;
      }
    )
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}

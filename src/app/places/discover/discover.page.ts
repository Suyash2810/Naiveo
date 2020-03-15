import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  private fetchedPlaces: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.fetchedPlaces = this.placesService.fetchPlaces();
    this.placesService.get_places().subscribe(
      (places) => {
        this.fetchedPlaces = places;
        console.log(this.fetchedPlaces);
      }
    )
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    console.log(event.detail);
  }
}

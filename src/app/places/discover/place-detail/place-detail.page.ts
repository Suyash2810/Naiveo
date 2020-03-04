import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private nvCntrl: NavController, private route: ActivatedRoute, private placeService: PlacesService) { }

  place: Place;

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        let id = params['placeID'];
        if (!id) {
          this.nvCntrl.navigateBack('/places/tabs/discover');
        } else {
          this.place = this.placeService.getPlaceById(id);
        }
      }
    )
  }

  bookPlace() {
    this.nvCntrl.navigateBack('/places/tabs/discover');
  }

}

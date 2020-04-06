import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapPickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var map = tt.map({
      key: 'WeYcSynyjv3gezHYOY5wm67ufAeuDgKK',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: [18.5204, 73.8567]
    });
    map.addControl(new tt.NavigationControl());
    
  }
}

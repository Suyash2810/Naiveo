import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [];

  constructor() { }

  getPlaces() {
    return [...this.places];
  }
}

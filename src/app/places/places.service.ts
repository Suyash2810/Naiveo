import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [
    new Place(1, "Paris", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&h=640&w=426', 149.58, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place(2, "New York", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&h=640&w=426', 249.58, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place(3, "Amsterdam", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/1187911/pexels-photo-1187911.jpeg?auto=compress&cs=tinysrgb&h=640&w=420', 124.58, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place(4, "Czech", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/1269788/pexels-photo-1269788.jpeg?auto=compress&cs=tinysrgb&h=640&w=420', 147.58, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place(5, "Prague", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/126292/pexels-photo-126292.jpeg?auto=compress&cs=tinysrgb&h=640&w=420', 137.58, new Date('2019-01-01'), new Date('2019-12-31'), 'abc')
  ];

  private _places = new Subject<Place[]>();
  private _place = new Subject<Place>();

  constructor(private authService: AuthService) { }

  getPlaces() {
    this._places.next(this.places);
    return [...this.places];
  }

  get_places() {
    return this._places.asObservable();
  }

  getPlaceById(id: string) {
    let place = this.places.find(p => p.id == id);
    this._place.next(place);
    return {
      ...place
    }
  }

  get_placeById() {
    return this._place.asObservable();
  }

  addPlace(title, description, price, dateFrom, dateTill) {

    const place: Place = new Place(Math.random().toString(), title, description, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&h=640&w=426', price, dateFrom, dateTill, this.authService.getUserId());
    this.places.push(place);
    this._places.next(this.places);
  }
}

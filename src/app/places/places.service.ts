import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
      'https://images.pexels.com/photos/1269788/pexels-photo-1269788.jpeg?auto=compress&cs=tinysrgb&h=640&w=420', 147.58, new Date('2019-01-01'), new Date('2019-12-31'), 'bcd'),
    new Place(5, "Prague", "Nullam ornare finibus lacus. Suspendisse pulvinar aliquam erat id accumsan. Aliquam erat volutpat. Morbi lacinia tortor erat, a posuere justo bibendum eget.",
      'https://images.pexels.com/photos/126292/pexels-photo-126292.jpeg?auto=compress&cs=tinysrgb&h=640&w=420', 137.58, new Date('2019-01-01'), new Date('2019-12-31'), 'efg')
  ];

  private _places = new Subject<Place[]>();
  private _place = new Subject<Place>();

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  fetchPlaces() {
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

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTill: Date, image: File) {

    type responseType = { status: string, result: any };
    const userId = this.authService.getUserId();
    console.log(userId);

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('price', price.toString());
    data.append('availableFrom', dateFrom.toISOString());
    data.append('availableTill', dateTill.toISOString());
    data.append('image', image);
    data.append('user', userId);

    this.httpClient.post<responseType>("http://localhost:3000/place", data)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  updatePlace(id: string, title: string, description: string, price: number) {

    let offer = this.places.find(place => place.id == id);
    offer = {
      ...offer,
      title: title,
      description: description,
      price: price
    }

    this.places = this.places.filter(place => place.id != id);

    this.places.push(offer);
    this._places.next(this.places);
  }
}

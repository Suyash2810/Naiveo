import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [];

  private _places = new Subject<Place[]>();
  private _place = new Subject<Place>();

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  fetchPlaces() {

    type responseType = { status: string, result: any };

    this.httpClient.get<responseType>("http://localhost:3000/places")
      .pipe(
        map(
          (response) => {
            const places = response.result;
            return places.map(place => {
              return {
                id: place._id,
                title: place.title,
                description: place.description,
                imageUrl: place.imageUrl,
                price: place.price,
                availableFrom: place.availableFrom,
                availableTill: place.availableTill,
                userID: place.user
              }
            });
          }
        )
      )
      .subscribe(
        (places) => {
          this.places = places;
          this._places.next(this.places);
          console.log(this.places);
        },
        error => {
          console.log(error);
        }
      );
  }

  get_places() {
    return this.places;
  }

  _get_places() {
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

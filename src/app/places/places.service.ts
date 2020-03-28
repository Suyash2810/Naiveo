import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [];
  private place: Place;
  private _places = new Subject<Place[]>();
  private _place = new Subject<Place>();

  constructor(private authService: AuthService, private httpClient: HttpClient, private toastController: ToastController) { }

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
        (places: Place[]) => {
          this.places = places;
          this._places.next(this.places);
        },
        error => {
          this.toastController.create({
            message: error,
            duration: 2000
          });
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

    type responseType = { status: string, result: any };

    this.httpClient.get<responseType>(`http://localhost:3000/place/${id}`)
      .pipe(
        map(response => {

          const place = response.result;

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
        })
      )
      .subscribe((place: Place) => {
        this.place = place;
        this._place.next(this.place);
      }, error => {
        this.toastController.create({
          message: error,
          duration: 2000
        });
      });
  }

  get_place() {
    return this.place;
  }

  _get_place() {
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
        if (response) {
          this.toastController.create({
            message: response.status,
            duration: 2000
          });
        }
      }, error => {
        this.toastController.create({
          message: error,
          duration: 2000
        });
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

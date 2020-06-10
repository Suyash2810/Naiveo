import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Place[] = [];
  private place: Place;
  private _places = new Subject<Place[]>();
  private _place = new Subject<Place>();

  constructor(private authService: AuthService, private httpClient: HttpClient, private toastController: ToastController,
    private alertController: AlertController) { }

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
                userID: place.user,
                visit: place.visit
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
        async error => {

          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.error,
            buttons: ['OK']
          });

          await alert.present();
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
          const place = response.result[0];

          return {
            id: place._id,
            title: place.title,
            description: place.description,
            imageUrl: place.imageUrl,
            price: place.price,
            availableFrom: place.availableFrom,
            availableTill: place.availableTill,
            userID: place.user,
            visit: place.visit
          }
        })
      )
      .subscribe((place: Place) => {
        this.place = place;
        this._place.next(this.place);
      }, async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'An error has occured.',
          message: error,
          buttons: ['OK']
        });

        await alert.present();
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
      .subscribe(async (response) => {
        if (response) {
          const toast = await this.toastController.create({
            message: response.status,
            duration: 2000
          });

          toast.present();
        }
      }, async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'An error has occured.',
          message: error,
          buttons: ['OK']
        });

        await alert.present();
      });
  }

  updatePlace(id: string, title: string, description: string, price: number) {

    type responseType = { status: string, result: any };

    const data = {
      id,
      title,
      description,
      price
    }

    this.httpClient.patch<responseType>("http://localhost:3000/place", data)
      .pipe(
        map(
          response => {
            const place = response.result;

            return {
              id: place._id,
              title: place.title,
              description: place.description,
              imageUrl: place.imageUrl,
              price: place.price,
              availableFrom: place.availableFrom,
              availableTill: place.availableTill,
              userID: place.user,
              visit: place.visit
            }
          }
        )
      )
      .subscribe(
        place => {
          this.places = this.places.filter(p => p.id != place.id);
          this.places.push(place);
          this._places.next(this.places);
          this.toastController.create({
            message: "The place has been updated.",
            duration: 3000
          }).then(toast => toast.present());
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'An error has occured.',
            message: error,
            buttons: ['OK']
          });

          await alert.present();
        }
      );
  }

  deletePlace(id: string) {

    type responseType = { status: string };

    this.httpClient.delete<responseType>(`http://localhost:3000/place/${id}`)
      .subscribe(
        response => {
          this.fetchPlaces();
          this.toastController.create({
            message: response.status,
            duration: 2000
          }).then(toast => toast.present());
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'An error has occured.',
            message: error.error,
            buttons: ['OK']
          });

          await alert.present();
        }
      );
  }
}

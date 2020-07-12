import { Injectable } from '@angular/core';
import { Bookable, Booking } from './booking.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { ToastController, AlertController } from '@ionic/angular';
import { UserService } from '../user-profile/user-profile.service';

@Injectable({ providedIn: 'root' })

export class BookingService {

    private bookings: Bookable[] = [];
    private _bookings = new Subject<Bookable[]>();

    constructor(private authService: AuthService, private httpClient: HttpClient, private toastController: ToastController,
        private alertController: AlertController, private profileService: UserService) {

    }

    fetchBookings() {

        type responseType = { status: string, result: any };

        this.httpClient.get<responseType>("http://localhost:3000/bookings")
            .pipe(
                map(
                    response => {
                        const bookings = response.result;

                        return bookings.map(booking => {
                            return {
                                id: booking._id,
                                placeId: booking.placeId,
                                userId: booking.userId,
                                title: booking.title,
                                imageUrl: booking.imageUrl,
                                first_name: booking.first_name,
                                last_name: booking.last_name,
                                bookedFrom: booking.bookedFrom,
                                bookedTill: booking.bookedTill,
                                guests: booking.guests,
                                locations: booking.locations.map(
                                    location => {
                                        return {
                                            id: location._id,
                                            name: location.name,
                                            price: location.price
                                        }
                                    }
                                ),
                                cost: booking.cost
                            }
                        });
                    }
                )
            )
            .subscribe(
                bookings => {
                    this.bookings = bookings;
                    this._bookings.next(this.bookings);
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

    getBookingsByUserId(id: string) {
        type responseType = { status: string, result: any };

        this.httpClient.get<responseType>("http://localhost:3000/bookings/" + id)
            .pipe(
                map(
                    response => {
                        const bookings = response.result;

                        return bookings.map(booking => {
                            return {
                                id: booking._id,
                                placeId: booking.placeId,
                                userId: booking.userId,
                                title: booking.title,
                                imageUrl: booking.imageUrl,
                                first_name: booking.first_name,
                                last_name: booking.last_name,
                                bookedFrom: booking.bookedFrom,
                                bookedTill: booking.bookedTill,
                                guests: booking.guests,
                                locations: booking.locations.map(
                                    location => {
                                        return {
                                            id: location._id,
                                            name: location.name,
                                            price: location.price
                                        }
                                    }
                                ),
                                cost: booking.cost
                            }
                        });
                    }
                )
            )
            .subscribe(
                bookings => {
                    this.bookings = bookings;
                    this._bookings.next(this.bookings);
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

    getBookings() {
        return this.bookings;
    }

    _getBookings() {
        return this._bookings.asObservable();
    }

    addBooking(id: string, title: string, imageUrl: string, first_name: string, last_name: string, bookedFrom: Date, bookedTill: Date, guests: number, locations: Array<{ name: string, price: number }>, cost: number, guideId: string) {

        const booking = new Booking(id, this.authService.getUserId(), title, imageUrl, first_name, last_name, bookedFrom, bookedTill, guests, locations, cost);

        type responseType = { status: string, result: any };

        this.httpClient.post<responseType>("http://localhost:3000/booking", booking)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        message: response.status,
                        duration: 2000
                    });

                    toast.present();

                    this.profileService.updateTours(guideId, 1)
                        .subscribe(
                            response => {
                                console.log(response.status);
                            },
                            async error => {
                                const alert = await this.alertController.create({
                                    header: "Error",
                                    message: "Tours could not be updated for the guide.",
                                    buttons: ["Ok"]
                                });

                                await alert.present();
                            }
                        );
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        subHeader: error.error.error._message,
                        message: "Please enter valid details. Make sure that all the fields have been filled.",
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    cancelBooking(id: string) {

        type responseType = { status: string };

        this.httpClient.delete<responseType>(`http://localhost:3000/booking/${id}`)
            .subscribe(
                response => {
                    this.fetchBookings();
                    this.toastController.create({
                        message: response.status,
                        duration: 2000
                    }).then(toast => {
                        toast.present();
                    });
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        subHeader: 'An error has occured.',
                        message: error.status,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            )
    }

    estimateCost(locations: Array<{ name: string, price: number }>, basic: number) {

        let totalCost = 0;
        locations.forEach(location => totalCost += location.price);
        return Promise.resolve(basic > totalCost ? basic : totalCost);
    }
}
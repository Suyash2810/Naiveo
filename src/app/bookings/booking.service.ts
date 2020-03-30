import { Injectable } from '@angular/core';
import { Bookable, Booking } from './booking.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })

export class BookingService {

    private bookings: Bookable[] = [];
    private _bookings = new Subject<Bookable[]>();

    constructor(private authService: AuthService, private httpClient: HttpClient, private toastController: ToastController) {

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
                                guests: booking.guests
                            }
                        })
                    }
                )
            )
            .subscribe(
                bookings => {
                    this.bookings = bookings;
                    this._bookings.next(this.bookings);
                },
                error => {
                    this.toastController.create({
                        message: error,
                        duration: 2000
                    }).then(toast => {
                        toast.present();
                    });
                }
            );
    }

    getBookings() {
        return this.bookings;
    }

    _getBookings() {
        return this._bookings.asObservable();
    }

    addBooking(id: string, title: string, imageUrl: string, first_name: string, last_name: string, bookedFrom: Date, bookedTill: Date, guests: number) {

        const booking = new Booking(id, this.authService.getUserId(), title, imageUrl, first_name, last_name, bookedFrom, bookedTill, guests);

        type responseType = { status: string, result: any };

        this.httpClient.post<responseType>("http://localhost:3000/booking", booking)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        message: response.status,
                        duration: 2000
                    });

                    toast.present();
                },
                async error => {
                    const toast = await this.toastController.create({
                        message: error,
                        duration: 2000
                    });

                    toast.present();
                }
            );
    }

    cancelBooking(id: string) {
        this.bookings = this.bookings.filter(b => b.id != id);
        this._bookings.next(this.bookings);
    }
}
import { Injectable } from '@angular/core';
import { Bookable, Booking } from './booking.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class BookingService {

    private bookings: Bookable[] = [];
    private _bookings = new Subject<Bookable[]>();


    constructor(private authService: AuthService) {

    }

    getBookings() {
        return this.bookings;
    }

    _getBookings() {
        return this._bookings.asObservable();
    }

    addBooking(id: string, title: string, description: string, price: number, bookedFrom: Date, bookedTill: Date, guests: number) {
        const booking = new Booking(Math.random().toString(), id, this.authService.getUserId(), title, description, price, bookedFrom, bookedTill, guests);
        this.bookings.push(booking);
        this._bookings.next(this.bookings);
    }

    cancelBooking() {

    }
}
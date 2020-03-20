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

    addBooking(id: string, title: string, imageUrl: string, first_name: string, last_name: string, bookedFrom: Date, bookedTill: Date, guests: number) {
        const booking = new Booking(Math.random().toString(), id, this.authService.getUserId(), title, imageUrl, first_name, last_name, bookedFrom, bookedTill, guests);
        this.bookings.push(booking);
        this._bookings.next(this.bookings);
    }

    cancelBooking(id: string) {
        this.bookings = this.bookings.filter(b => b.id != id);
        this._bookings.next(this.bookings);
    }
}
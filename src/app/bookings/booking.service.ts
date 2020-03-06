import { Injectable } from '@angular/core';
import { Bookable, Booking } from './booking.model';

@Injectable({ providedIn: 'root' })

export class BookingService {

    private bookings: Array<Bookable> = [
        new Booking('1', 'p1', 'u1', 'Manhattan', 12)
    ];

    constructor() {

    }

    getBookings() {
        return [...this.bookings];
    }
}
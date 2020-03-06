import { Injectable } from '@angular/core';
import { Bookable } from './booking.model';

@Injectable({ providedIn: 'root' })

export class BookingService {

    private bookings: Array<Bookable> = [
        {
            id: '1',
            placeId: 'p1',
            userId: 'u1',
            placeTitle: 'Manhattan',
            guestNumber: 12
        }
    ];

    constructor() {

    }

    getBookings() {
        return [...this.bookings];
    }
}
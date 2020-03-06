import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Bookable } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  fetchedBookings: Array<Bookable> = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    this.fetchedBookings = this.bookingService.getBookings();
  }

  onDelete(id: String) {
    console.log("The item is being deleted: " + id);
  }
}

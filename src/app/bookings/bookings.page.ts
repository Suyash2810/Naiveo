import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Bookable } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  fetchedBookings: Array<Bookable> = [];
  bookingSub: Subscription;

  constructor(private bookingService: BookingService) { }

  ionViewWillEnter() {
    this.bookingService.fetchBookings();
  }

  ngOnInit() {
    this.fetchedBookings = this.bookingService.getBookings();
    this.bookingSub = this.bookingService._getBookings().subscribe(
      bookings => {
        this.fetchedBookings = bookings;
      }
    );
  }

  onDelete(id: string, slidBooking: IonItemSliding) {
    slidBooking.close();
    this.bookingService.cancelBooking(id);
  }

  ngOnDestroy() {
    this.bookingSub.unsubscribe();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { PricePipe } from './create-booking/price.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSpinnerModule,
    BookingsPageRoutingModule
  ],
  declarations: [BookingsPage, PricePipe]
})
export class BookingsPageModule { }

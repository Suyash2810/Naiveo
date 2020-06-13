import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSpinnerModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent, ReviewsComponent],
  entryComponents: [CreateBookingComponent, ReviewsComponent]
})
export class PlaceDetailPageModule { }

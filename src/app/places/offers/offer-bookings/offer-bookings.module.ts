import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferBookingsPageRoutingModule } from './offer-bookings-routing.module';

import { OfferBookingsPage } from './offer-bookings.page';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { IssueService } from './offer-issues.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSpinnerModule,
    OfferBookingsPageRoutingModule
  ],
  declarations: [OfferBookingsPage],
  providers: [IssueService]
})
export class OfferBookingsPageModule { }

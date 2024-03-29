import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPagePageRoutingModule } from './detail-page-routing.module';

import { DetailPagePage } from './detail-page.page';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SlidesComponent } from './slides/slides.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPagePageRoutingModule,
    LoadingSpinnerModule,
    SharedModule
  ],
  declarations: [DetailPagePage, SlidesComponent]
})
export class DetailPagePageModule { }

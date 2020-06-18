import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowPagePageRoutingModule } from './follow-page-routing.module';

import { FollowPagePage } from './follow-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowPagePageRoutingModule
  ],
  declarations: [FollowPagePage]
})
export class FollowPagePageModule {}

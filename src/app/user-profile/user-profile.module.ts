import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSpinnerModule,
    UserProfilePageRoutingModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule { }

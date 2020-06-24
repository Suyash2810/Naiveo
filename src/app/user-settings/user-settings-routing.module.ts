import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSettingsPage } from './user-settings.page';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoadingSpinnerModule],
  exports: [RouterModule],
})
export class UserSettingsPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowPagePage } from './follow-page.page';

const routes: Routes = [
  {
    path: '',
    component: FollowPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowPagePageRoutingModule {}

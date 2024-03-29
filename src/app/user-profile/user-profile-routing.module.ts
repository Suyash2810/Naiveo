import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  },
  {
    path: 'detail-page/:id',
    loadChildren: () => import('./detail-page/detail-page.module').then(m => m.DetailPagePageModule)
  },
  {
    path: 'follow-page',
    loadChildren: () => import('./follow-page/follow-page.module').then(m => m.FollowPagePageModule)
  },
  {
    path: 'search-page',
    loadChildren: () => import('./search-page/search-page.module').then(m => m.SearchPagePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfilePageRoutingModule { }

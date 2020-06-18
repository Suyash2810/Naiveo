import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
    canLoad: [AuthGuardGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [AuthGuardGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

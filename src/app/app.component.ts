import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController, ModalController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private user: User;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private menu: MenuController,
    private navController: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.autoUpdateAuthData();
    this.authService.fetchUserData.subscribe(data => this.user = data.user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  openSettingsPage() {
    this.menu.toggle();
    this.navController.navigateForward('settings');
  }

  onLogOut() {
    this.authService.logout();
  }

  searchGuide() {
    this.menu.close();
    this.router.navigate(['/', 'user', 'search-page']);
  }
}

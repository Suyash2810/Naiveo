import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { SearchComponent } from './user-profile/search/search.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private user: User;
  private search: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menu: MenuController,
    private navController: NavController,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.autoUpdateAuthData();
    this.authService.fetchUserData.subscribe(data => this.user = data.user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
    console.log(this.search);

    this.modalController.create({
      component: SearchComponent,
      componentProps: {
        search: this.search
      }
    }).then(modal => {
      modal.present();

      return modal.onDidDismiss()
    }).then(
      data => {
        console.log(data);
      }
    );

  }
}

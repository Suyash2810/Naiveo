import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { ModalController, AlertController, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  guides: User[] = [];
  guideSubscription: Subscription;
  name: string = "";

  constructor(private userService: UserService,
    private alertController: AlertController,
    private router: Router, private navController: NavController) { }

  ngOnInit() {

    this.guideSubscription = this.userService.fetchGuides().subscribe(
      (response) => {
        this.guides = response.guides;
        console.log(this.guides);
      },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error,
          buttons: ['OK']
        });

        await alert.present();
      }
    )
  }

  onDismiss() {
    this.navController.navigateBack('/places');
  }

  onClick(id: string) {
    this.navController.navigateForward('/user/detail-page');
  }

  searchBar() {
    console.log(this.name);
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }
}

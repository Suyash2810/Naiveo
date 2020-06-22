import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() search: string;
  guides: User[] = [];
  guideSubscription: Subscription;
  name: string = "";

  constructor(private modalController: ModalController, private userService: UserService,
    private alertController: AlertController,
    private router: Router, private menuController: MenuController) { }

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
    this.modalController.dismiss({
      "dismissed": true
    });
  }

  onClick(id: string) {
    this.modalController.dismiss();
    this.menuController.close();
    this.router.navigate(['/', 'user', 'detail-page']);
  }

  searchBar() {
    console.log(this.name);
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }

}

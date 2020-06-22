import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user-profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() search: string;
  guides: User[] = [];
  guideSubscription: Subscription;

  constructor(private modalController: ModalController, private userService: UserService, private alertController: AlertController) { }

  ngOnInit() {

    this.guideSubscription = this.userService.fetchGuides().subscribe(
      (response) => {
        this.guides = response.guides;
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

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }

}

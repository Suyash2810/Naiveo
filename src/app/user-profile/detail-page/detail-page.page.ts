import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit, OnDestroy {

  guide: any;
  id: string;
  guideSubscription: Subscription;

  constructor(private route: ActivatedRoute, private profileService: UserService,
    private alertController: AlertController) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.guideSubscription = this.profileService.fetchGuideById(this.id).subscribe(
          (response) => {
            this.guide = response.guide;
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
    );
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }
}

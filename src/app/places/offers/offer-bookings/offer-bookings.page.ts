import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { IssueService } from './offer-issues.service';
import { User } from 'src/app/auth/user.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: Place;
  offerSub: Subscription;
  isLoading: boolean = false;
  userId: string;
  user: User;
  userSubscription: Subscription;
  issueSubscription: Subscription;
  issues: Array<any> = [];

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private route: ActivatedRoute, private nvCtrl: NavController, private placeService: PlacesService,
    private authService: AuthService, private issueService: IssueService,
    private alertController: AlertController, private actionSheetController: ActionSheetController,
    private toastController: ToastController) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.isLoading = true;
        let id = params['id'];
        if (!id) {
          this.nvCtrl.navigateBack('/places/tabs/offers');
        } else {
          this.placeService.getPlaceById(id);
          this.place = this.placeService.get_place();
          this.offerSub = this.placeService._get_place().subscribe(offer => {
            this.place = offer;
            this.userId = this.authService.getUserId();

            this.issueService.fetchPopulatedIssues(this.place.id);
            this.issueSubscription = this.issueService.getPopulatedIssues().subscribe(
              (issues: Array<any>) => {
                this.issues = issues;
                console.log(this.issues);
              },
              async () => {
                const alert = this.alertController.create({
                  header: 'Error',
                  message: "Issue could not be fetched.",
                  buttons: ['Ok']
                });

                (await alert).present();
              }
            );

            this.authService.fetchUser();

            this.userSubscription = this.authService._getUser().subscribe(
              (user: User) => {
                this.user = user;
                this.isLoading = false;
              }
            )
          });
        }
      }
    )
  }

  onSubmit() {
    this.issueService.addIssue(this.userId, this.place.id, this.form.value.email, this.form.value.message);
    this.form.reset();
    this.nvCtrl.navigateBack('/places/tabs/offers');
  }

  async handleIssue(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Issue',
      buttons: [{
        text: 'Resolved',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.issueService.deleteIssue(id).subscribe(
            async (response: HttpResponse<{ status: string }>) => {
              if (response.body) {

                const toast = this.toastController.create({
                  message: response.body.status,
                  duration: 3000
                });
                (await toast).present();
                this.nvCtrl.navigateBack('/places/tabs/offers');
              }
            },
            async () => {
              const alert = this.alertController.create({
                header: 'Error',
                message: "Issue could not be resolved.",
                buttons: ['Ok']
              });

              (await alert).present();
            }
          )
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();

  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
    this.issueSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}

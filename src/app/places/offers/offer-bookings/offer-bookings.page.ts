import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { IssueService } from './offer-issues.service';

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
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private route: ActivatedRoute, private nvCtrl: NavController, private placeService: PlacesService,
    private authService: AuthService, private issueService: IssueService) { }

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
            this.isLoading = false;
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

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
}

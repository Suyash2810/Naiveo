import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[] = [];
  offerSub: Subscription;
  isLoading: boolean = false;
  user: User;
  userSub: Subscription;

  constructor(private placeService: PlacesService, private router: Router, private authService: AuthService) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placeService.fetchPlaces();
  }

  ngOnInit() {
    this.offers = this.placeService.get_places();
    this.offerSub = this.placeService._get_places().subscribe(offers => {
      this.offers = offers;
      this.isLoading = false;
    });

    this.authService.fetchUser();
    this.userSub = this.authService._getUser().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onEdit(id: string, slidItem: IonItemSliding) {
    slidItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }

  ngOnDestroy() {
    this.offerSub.unsubscribe();
  }
}

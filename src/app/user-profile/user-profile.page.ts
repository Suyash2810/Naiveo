import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {

  user: User;
  isLoading: boolean = false;
  userSub: Subscription;

  constructor(private authService: AuthService) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.authService.fetchUser();
  }

  ionViewDidEnter() {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.userSub = this.authService._getUser().subscribe(
      (user) => {
        this.user = user;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

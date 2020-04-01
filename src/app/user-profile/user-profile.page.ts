import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user: User;
  userSub: Subscription;
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.user = this.authService.getUser();
    console.log(this.user);
    this.userSub = this.authService._getUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.isLoading = false;
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from "@ionic/core";
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.page.html',
  styleUrls: ['./follow-page.page.scss'],
})
export class FollowPagePage implements OnInit, OnDestroy {

  userId: string;
  userData: any;
  userSubscription: Subscription;

  constructor(private profileService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
  }


  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }

  ngOnDestroy() {

  }
}

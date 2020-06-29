import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from "@ionic/core";
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.page.html',
  styleUrls: ['./follow-page.page.scss'],
})
export class FollowPagePage implements OnInit, OnDestroy {

  userData: any;
  userSubscription: Subscription;

  constructor(private profileService: UserService) { }

  ngOnInit() {
  }


  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }

  ngOnDestroy() {

  }
}

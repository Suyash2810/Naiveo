import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from "@ionic/core";
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/auth/user.model';
import { map } from 'rxjs/operators';
import { isUndefined } from 'util';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.page.html',
  styleUrls: ['./follow-page.page.scss'],
})
export class FollowPagePage implements OnInit, OnDestroy {

  userId: string;
  segment: boolean = true;
  isLoading: boolean = true;
  followers: Array<User>;
  following: Array<User>;
  followerSub: Subscription;
  followingSub: Subscription;

  constructor(private profileService: UserService, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.followingSub = this.profileService.getFollowing(this.userId)
      .pipe(
        map(
          (response) => {
            if (isUndefined(response.data))
              return [];

            let following = response.data.following;
            return following.map(follow => {
              return {
                id: follow._id,
                name: follow.name,
                email: follow.email,
                image: follow.image,
                identity: follow.identity
              }
            })
          }
        )
      )
      .subscribe(
        (response) => {
          this.following = response;

          this.followerSub = this.profileService.getFollowers(this.userId)
            .pipe(
              map(
                response => {
                  if (isUndefined(response.data)) {
                    return [];
                  }

                  let followers = response.data.followers;
                  return followers.map(follower => {
                    return {
                      id: follower._id,
                      name: follower.name,
                      email: follower.email,
                      image: follower.image,
                      identity: follower.identity
                    }
                  })
                }
              )
            )
            .subscribe(
              (response) => {
                this.followers = response;
                this.isLoading = false;
              },
              async error => {
                const alert = await this.alertController.create({
                  header: "Error",
                  message: error,
                  buttons: ['Ok']
                });

                await alert.present();
              }
            )
        },
        async error => {
          const alert = await this.alertController.create({
            header: "Error",
            message: error,
            buttons: ['Ok']
          });

          await alert.present();
        }
      );
  }


  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value == "following") {
      this.segment = true;
    } else {
      this.segment = false;
    }
  }

  ngOnDestroy() {
    this.followingSub.unsubscribe();
    this.followerSub.unsubscribe();
  }
}

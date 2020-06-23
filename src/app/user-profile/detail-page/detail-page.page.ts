import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit, OnDestroy {

  guide: any;
  id: string;
  guideSubscription: Subscription;

  constructor(private route: ActivatedRoute, private profileService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.guideSubscription = this.profileService.fetchGuideById(this.id).subscribe(
          (response) => {
            this.guide = response.guide;
            console.log(this.guide);
          }
        )
      }
    );
  }

  ngOnDestroy() {
    this.guideSubscription.unsubscribe();
  }
}

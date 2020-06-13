import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ReviewService } from './reviews.service';
import { Review } from './reviews.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {

  @Input() placeId: string;
  @Input() placeName: string;

  reviews: Review[] = [];
  reviewSubscription: Subscription;

  constructor(private modalController: ModalController, private reviewService: ReviewService) { }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnDestroy() {
  }
}

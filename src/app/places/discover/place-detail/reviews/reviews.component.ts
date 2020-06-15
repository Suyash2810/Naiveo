import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ReviewService } from './reviews.service';
import { Review } from './reviews.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {

  @Input() placeId: string;
  @Input() placeName: string;
  @Input() userId: string;
  @ViewChild('f', { static: false }) form: NgForm;
  private editMode: boolean = false;

  reviews: Array<any> = [];
  reviewsSubscription: Subscription;
  review: Review;
  reviewSubscription: Subscription;

  constructor(private modalController: ModalController, private reviewService: ReviewService) { }

  ngOnInit() {

    this.reviewService.fetchReviews(this.placeId);
    this.reviews = this.reviewService.getReviews();
    this.reviewSubscription = this.reviewService._getReviews().subscribe(
      (reviews: Array<any>) => {
        this.reviews = reviews;
        console.log(this.reviews);
      }
    );
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    if (!this.editMode) {
      this.reviewService.addReview(this.placeId, this.userId, this.form.value.rating, this.form.value.message);
    } else {
      this.reviewService.updateReview(this.review.id, this.form.value.rating, this.form.value.message, this.placeId);
    }

    this.form.reset();
    this.editMode = false;
  }

  onDelete(id: string) {
    this.reviewService.deleteReview(id, this.placeId);
  }

  onEdit(id: string) {
    this.reviewService.getReviewById(id);
    this.editMode = true;
    this.reviewSubscription = this.reviewService._getReview()
      .subscribe(
        (review) => {
          this.review = review;
          this.form.setValue({
            message: this.review.message,
            rating: this.review.rating
          });
        }
      );
  }

  ngOnDestroy() {
    this.reviewsSubscription.unsubscribe();
    this.reviewSubscription.unsubscribe();
  }
}

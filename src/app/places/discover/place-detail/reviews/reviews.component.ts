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

  reviews: Review[] = [];
  reviewSubscription: Subscription;

  constructor(private modalController: ModalController, private reviewService: ReviewService) { }

  ngOnInit() {

    this.reviewService.fetchReviews(this.placeId);
    this.reviews = this.reviewService.getReviews();
    this.reviewSubscription = this.reviewService._getReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
      }
    );
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    this.reviewService.addReview(this.placeId, this.userId, this.form.value.rating, this.form.value.message);
    this.form.reset();
  }

  onDelete(id: string) {
    this.reviewService.deleteReview(id, this.placeId);
  }

  onEdit(id: string) {
    this.editMode = true;
  }

  ngOnDestroy() {

  }
}

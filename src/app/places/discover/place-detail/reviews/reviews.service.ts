import { Injectable } from '@angular/core';
import { Review } from './reviews.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: "root"
})

export class ReviewService {

    reviews: Review[] = [];
    _reviews = new Subject<Review[]>();
    review: Review;
    _review = new Subject<Review>();

    constructor(private httpClient: HttpClient, private alertController: AlertController, private toastController: ToastController) {

    }

    fetchReviews(placeId: string) {

        type responseType = { status: string, result: any };

        this.httpClient.get<responseType>(`http://localhost:3000/reviews/${placeId}`)
            .pipe(
                map(
                    (data) => {
                        return data.result.map(
                            (review) => {
                                return {
                                    id: review._id,
                                    placeId: review.placeId,
                                    userId: review.placeId,
                                    rating: review.rating,
                                    message: review.message,
                                    createdAt: review.createdAt
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (reviews: Review[]) => {
                    this.reviews = reviews;
                    this._reviews.next(this.reviews);
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: "Reviews could not be fetched",
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    getReviews() {
        return this.reviews;
    }

    _getReviews() {
        return this._reviews.asObservable();
    }

    getReview() {
        return this.review;
    }

    _getReview() {
        return this._review.asObservable();
    }

    addReview(placeId: string, userId: string, rating: number, message: string) {

        type responseType = { status: string };
        const data = {
            placeId,
            userId,
            rating,
            message
        }

        console.log(data);

        this.httpClient.post<responseType>("http://localhost:3000/review", data)
            .subscribe(
                () => {
                    this.fetchReviews(placeId);
                },
                async () => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: "Review could not be saved.",
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    updateReview(reviewId: string, rating: number, message: string, placeId: string) {

        type responseType = { status: string };
        const data = {
            rating,
            message
        }

        this.httpClient.patch<responseType>(`http://localhost:3000/review/${reviewId}`, data)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        message: response.status,
                        duration: 3000
                    });

                    await toast.present();
                    this.fetchReviews(placeId);
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: error.error.message,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    deleteReview(reviewId: string, placeId: string) {

        type responseType = { status: string };

        this.httpClient.delete<responseType>(`http://localhost:3000/review/${reviewId}`)
            .subscribe(
                async (response) => {
                    const toast = await this.toastController.create({
                        message: response.status,
                        duration: 3000
                    });

                    await toast.present();
                    this.fetchReviews(placeId);
                },
                async error => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: error.error.message,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }

    getReviewById(id: string) {

        type responseType = { status: string, result: any };

        this.httpClient.get<responseType>("http://localhost:3000/review/" + id)
            .pipe(
                map(
                    (data) => {
                        const result = data.result;

                        return {
                            id: result.id,
                            placeId: result.placeId,
                            userId: result.userId,
                            rating: result.rating,
                            message: result.message,
                            createdAt: result.createdAt
                        }
                    }
                )
            )
            .subscribe(
                (review: Review) => {
                    this.review = review;
                    this._review.next(this.review);
                },
                async (error) => {
                    const alert = await this.alertController.create({
                        header: 'Error',
                        message: error.error.message,
                        buttons: ['OK']
                    });

                    await alert.present();
                }
            );
    }
}
import { Injectable } from '@angular/core';
import { Review } from './reviews.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: "root"
})

export class ReviewService {

    reviews: Review[] = [];
    _reviews = new Subject<Review[]>();

    constructor(private httpClient: HttpClient, private alertController: AlertController) {

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
                                    message: review.message
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
}
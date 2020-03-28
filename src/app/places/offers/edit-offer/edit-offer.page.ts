import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  offer: Place;
  id: string;
  form: FormGroup;
  offerSub: Subscription;
  isLoading: boolean = false;
  constructor(private placeService: PlacesService, private route: ActivatedRoute, private navigationController: NavController) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.isLoading = true;
        this.id = params['offerID'];
        this.placeService.getPlaceById(this.id);
        this.offer = this.placeService.get_place();
        this.offerSub = this.placeService._get_place().subscribe(offer => {
          this.offer = offer;
          this.form = new FormGroup({
            title: new FormControl(this.offer.title, { validators: Validators.required }),
            description: new FormControl(this.offer.description, { validators: Validators.maxLength(180) }),
            price: new FormControl(this.offer.price, { validators: Validators.required })
          });
          this.isLoading = false;
        });
      }
    );
  }

  onSubmit() {
    this.placeService.updatePlace(this.id, this.form.value.title, this.form.value.description, this.form.value.price);
    this.navigationController.navigateBack('/places/tabs/offers');
  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
}

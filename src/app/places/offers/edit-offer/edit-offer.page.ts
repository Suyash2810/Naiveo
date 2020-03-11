import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  offer: Place;
  id: string;
  form: FormGroup;

  constructor(private placeService: PlacesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['offerID'];
        this.offer = this.placeService.getPlaceById(this.id);
        this.form = new FormGroup({
          title: new FormControl(this.offer.title, { validators: Validators.required }),
          description: new FormControl(this.offer.description, { validators: Validators.maxLength(180) }),
          price: new FormControl(this.offer.price, { validators: Validators.required })
        });
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

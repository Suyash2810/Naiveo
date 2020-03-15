import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      description: new FormControl(null, { validators: [Validators.required, Validators.maxLength(180)] }),
      price: new FormControl(0, { validators: [Validators.required, Validators.minLength(1)] }),
      dateFrom: new FormControl(null, { validators: [Validators.required] }),
      dateTill: new FormControl(null, { validators: Validators.required })
    });
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    this.placeService.addPlace(this.form.value.title, this.form.value.description, +this.form.value.price, new Date(this.form.value.dateFrom), new Date(this.form.value.dateTill));
    this.form.reset();
    this.router.navigate(['/', 'places', 'tabs', 'offers']);
  }
}

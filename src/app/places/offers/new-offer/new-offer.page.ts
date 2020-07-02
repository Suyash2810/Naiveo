import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;
  imagePreview: string = "assets/img/offer.png";
  currentDate: String = new Date().toISOString().substring(0, 10);
  endDate: String;

  constructor(private placeService: PlacesService, private router: Router) {

  }

  ngOnInit() {

    this.endDate = (new Date((new Date()).getTime() + (365 * 24 * 60 * 60 * 1000))).toISOString().substring(0, 10);

    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      description: new FormControl(null, { validators: [Validators.required, Validators.maxLength(180)] }),
      price: new FormControl(0, { validators: [Validators.required, Validators.minLength(1)] }),
      dateFrom: new FormControl(null, { validators: [Validators.required] }),
      dateTill: new FormControl(null, { validators: Validators.required }),
      image: new FormControl(null, { validators: Validators.required }),
      visit: new FormArray([])
    });
  }

  uploadImage(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }

    reader.readAsDataURL(file);
  }

  onAddControl() {

    let group = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] })
    });

    (<FormArray>this.form.get('visit')).push(group);
  }

  removeLocation(i: number) {
    (<FormArray>this.form.get('visit')).removeAt(i);
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    this.placeService.addPlace(this.form.value.title, this.form.value.description, +this.form.value.price, new Date(this.form.value.dateFrom), new Date(this.form.value.dateTill), this.form.value.image, this.form.value.visit);
    this.form.reset();
    this.router.navigate(['/', 'places', 'tabs', 'offers']);
  }
}

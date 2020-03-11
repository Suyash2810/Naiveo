import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  onSubmit() {
    this.modalController.dismiss({ message: "This is just a dummy message." }, 'confirm');
    console.log(this.form.value);
  }
}

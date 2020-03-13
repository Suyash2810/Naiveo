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
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: false }) form: NgForm;
  @ViewChild('fromDate', { static: true }) fromDateCheck;
  @ViewChild('tillDate', { static: true }) tillDateCheck;
  startDate: string;
  endDate: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTill = new Date(this.selectedPlace.availableTill);

    if (this.selectedMode === 'random') {

      this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTill.getTime() - (7 * 24 * 60 * 60 * 1000) - availableFrom.getTime())).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + (Math.random() * (20 * 24 * 60 * 60 * 1000))).toISOString();

    }
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  onSubmit() {
    this.modalController.dismiss({
      message: {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        guests: this.form.value.guests,
        fromDate: this.form.value.fromDate,
        tillDate: this.form.value.tillDate
      }
    }, 'confirm');
  }

  checkValidDates() {
    return new Date(this.tillDateCheck.value) > new Date(this.fromDateCheck.value);
  }
}

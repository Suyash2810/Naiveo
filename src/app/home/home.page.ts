import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  text: string = "This is a newly created native app.";

  constructor() { }

  btnClick() {
    this.text = "Welcome Suyash.";
  }
}

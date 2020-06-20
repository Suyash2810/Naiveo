import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() search: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.search);
  }

  onDismiss() {
    this.modalController.dismiss({
      "dismissed": true
    });
  }

}

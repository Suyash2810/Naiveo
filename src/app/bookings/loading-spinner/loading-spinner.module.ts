import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [LoadingSpinnerComponent],
    imports: [IonicModule],
    exports: [CommonModule, LoadingSpinnerComponent]
})

export class LoadingSpinnerModule {

}
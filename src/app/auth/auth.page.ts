import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;
  isLogin: boolean = true;
  imagePreview: string = "https://images.pexels.com/photos/2947917/pexels-photo-2947917.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  constructor(private authService: AuthService, private router: Router, private loadingCntrl: LoadingController) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
    this.loadingCntrl.create({ keyboardClose: true, message: 'Loading...' }).then(loadController => {
      loadController.present();
      setTimeout(() => {
        loadController.dismiss()
        this.router.navigateByUrl('/places');
      }, 2000);
    });
  }

  changeSignMode(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "sign-in") {
      this.isLogin = true
    } else if (event.detail.value === "sign-up") {
      this.isLogin = false;
    }
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }

    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

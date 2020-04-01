import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  file: File;
  imagePreview: string = "https://images.pexels.com/photos/2947917/pexels-photo-2947917.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  constructor(private authService: AuthService, private router: Router, private loadingCntrl: LoadingController,
    private toastController: ToastController) { }

  ionViewWillEnter() {
    if (this.authService.getAuthenticated() && this.authService.getToken() != null) {
      this.router.navigateByUrl('/places');
    }
  }

  ngOnInit() {
  }

  login() {

  }

  changeSignMode(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "sign-in") {
      this.isLogin = true
    } else if (event.detail.value === "sign-up") {
      this.isLogin = false;
    }
  }

  uploadImage(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }

    reader.readAsDataURL(this.file);
  }

  onSubmit() {
    if (this.isLogin == true) {
      this.authService.login(this.form.value.email, this.form.value.password);
    } else {
      this.loadingCntrl.create({
        keyboardClose: true,
        message: "Registering user"
      }).then(loadingController => {
        this.authService.signup(this.form.value.username, this.form.value.email, this.form.value.password, this.file)
          .subscribe(
            response => {
              loadingController.present();
              this.toastController.create({
                message: response.status,
                duration: 2000
              }).then(toastController => {
                this.router.navigateByUrl('/auth');
                this.form.reset();
                loadingController.dismiss();
                toastController.present();
              });
            },
            error => {
              this.toastController.create({
                message: error,
                duration: 2000
              }).then(toastController => {
                this.router.navigateByUrl('/auth');
                toastController.present();
              });
            }
          );
      });
    }
  }
}

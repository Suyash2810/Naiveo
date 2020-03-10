import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

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

  onSubmit() {
    console.log(this.form);
  }
}

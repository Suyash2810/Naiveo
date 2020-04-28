import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = true;
  private userID: string;
  private token: string;
  private username: string;
  private user: User;
  private _user = new Subject<User>();
  fetchUserData = new EventEmitter<{ user: User }>();
  private _isAuthenticated = new Subject<boolean>();
  authTimer: any;

  constructor(private router: Router, private httpClient: HttpClient, private toastController: ToastController,
    private loadingController: LoadingController, private alertController: AlertController) { }


  getToken() {
    return this.token;
  }

  getAuthenticated() {
    return this.isAuthenticated;
  }

  _getAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  getUser() {
    return this.user;
  }

  _getUser() {
    return this._user.asObservable();
  }

  getUserId() {
    return this.userID;
  }

  login(email: string, password: string) {

    type responseType = { status: string, user: any, token: string, expireTime: number };

    this.httpClient.post<responseType>("http://localhost:3000/login", { email, password })
      .subscribe(
        response => {
          this.loadingController.create({
            keyboardClose: true,
            message: "Loading"
          }).then(loadingController => {

            loadingController.present();

            this.token = response.token;
            const expiresIn = response.expireTime;
            this.username = response.user.name;
            this.userID = response.user._id;

            if (this.token) {
              this.setAuthTimer(expiresIn);

              let currentTime = new Date();
              let expiryTime = new Date(currentTime.getTime() + expiresIn * 1000);

              this.setAuthData(this.token, this.userID, this.username, expiryTime);
              this.isAuthenticated = true;
              this._isAuthenticated.next(this.isAuthenticated);
              this.toastController.create({
                message: `Welcome ${this.username}`,
                duration: 2000
              }).then(toast => {
                toast.present();
              });
              this.router.navigateByUrl('/places');
              loadingController.dismiss();
            }
          });
        },
        async (error) => {

          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'An error has occured.',
            message: "The user couldn\'t be logged in.",
            buttons: ['OK']
          });

          await alert.present();
          this.router.navigateByUrl('/auth');
        }
      );
  }


  autoUpdateAuthData() {

    const dataFromStorage = this.getAuthData();

    if (dataFromStorage) {

      const currentTime = new Date();
      const validTime = dataFromStorage.expiresIn.getTime() - currentTime.getTime();
      if (validTime > 0) {
        this.token = dataFromStorage.token;
        this.userID = dataFromStorage.userId;
        this.username = dataFromStorage.username;
        this.isAuthenticated = true;
        this.setAuthTimer(validTime / 1000);
        this._isAuthenticated.next(this.isAuthenticated);
      } else {
        return;
      }
    }
  }

  setAuthTimer(duration: number) {

    this.authTimer = setTimeout(
      () => {
        this.logout();
      }, duration * 1000
    );
  }


  private setAuthData(token: string, userId: string, userName: string, expiryTime: Date) {

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', userName);
    localStorage.setItem('expiresIn', expiryTime.toISOString());
  }

  private getAuthData() {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const expireTime = localStorage.getItem('expiresIn');

    if (!token || !expireTime) {
      return;
    }

    return {
      token: token,
      userId: userId,
      username: username,
      expiresIn: new Date(expireTime)
    }
  }

  private removeAuthData() {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('expiresIn');
  }

  logout() {

    this.loadingController.create({
      keyboardClose: true,
      message: "Logging out"
    }).then(loadingController => {

      loadingController.present();

      this.token = null;
      this.isAuthenticated = false;
      this._isAuthenticated.next(this.isAuthenticated);
      this.userID = null;
      this.user = null;
      this._user.next(this.user);

      clearTimeout(this.authTimer);
      this.removeAuthData();

      this.toastController.create({
        message: "You have been successfully logged out.",
        duration: 2000
      }).then(toast => {
        this.router.navigateByUrl('/auth');
        loadingController.dismiss();
        toast.present();
      });
    });
  }

  signup(username: string, email: string, password: string, image: File, identity: boolean) {

    type responseType = { status: string, result: any };
    let identify: string = identity == true ? "user" : "tour guide";

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('image', image);
    data.append('identity', identify);

    return this.httpClient.post<responseType>("http://localhost:3000/register", data);
  }

  fetchUser() {

    type responseType = { status: string, result: any };

    this.httpClient.get<responseType>("http://localhost:3000/user")
      .pipe(
        map(
          response => {
            const user = response.result;
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              image: user.image,
              identity: user.identity
            }
          }
        )
      )
      .subscribe(
        (user: User) => {
          this.user = user;
          this._user.next(this.user);
        }
      );
  }

  deleteAccount() {
    type responseType = { status: string };
    return this.httpClient.delete<responseType>("http://localhost:3000/user");
  }
}

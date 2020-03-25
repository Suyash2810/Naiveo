import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = true;
  private userID: string = 'abc';

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(email: string, password: string) {

    type responseType = { status: string, result: any };

    this.httpClient.post<responseType>("http://localhost:3000/login", { email, password })
      .subscribe(
        result => {
          console.log(result);
          this.isAuthenticated = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth');
  }

  getAuthenticated() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userID;
  }

  signup(username: string, email: string, password: string, image: File) {

    type responseType = { status: string, result: any };
    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('image', image);

    return this.httpClient.post<responseType>("http://localhost:3000/register", data);
  }
}

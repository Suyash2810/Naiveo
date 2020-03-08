import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = true;

  constructor(private router: Router) { }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth');
  }

  getAuthenticated() {
    return this.isAuthenticated;
  }
}

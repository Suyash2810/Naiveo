import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  @Output() userEmit = new EventEmitter<{ user: User }>();
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.fetchUser();
    this.user = this.authService.getUser();
    this.authService._getUser().subscribe(user => {
      this.user = user
      this.authService.fetchUserData.emit({ user: this.user });
    });
  }

}

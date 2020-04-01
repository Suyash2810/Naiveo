import { Router, CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PlacesService } from '../../places.service';
import { Route } from '@angular/compiler/src/core';
import { Place } from '../../places.model';

export class EditGuard implements CanLoad {

    private place: Place;

    constructor(private authService: AuthService,
        private router: Router, private placeService: PlacesService) {
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        this.placeService._get_place().subscribe(place => this.place = place);
        if (this.place.userID != this.authService.getUserId()) {
            console.log("Not authorized.");
            this.router.navigateByUrl('/places/tabs/offers');
        } else {
            return true;
        }
    }
}
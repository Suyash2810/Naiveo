import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: "root" })

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const token = this.authService.getToken();

        if (!token) {
            return next.handle(request);
        }

        const reqClone = request.clone({
            headers: request.headers.set('authaccess', token)
        });

        return next.handle(reqClone);

    }
}

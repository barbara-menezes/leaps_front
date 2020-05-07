import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../main/services/auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(
        private loginService: AuthService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                this.redirectToLogin()
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    redirectToLogin() {
        this.loginService.logout();
        this.router.navigateByUrl('/login');
    }
}
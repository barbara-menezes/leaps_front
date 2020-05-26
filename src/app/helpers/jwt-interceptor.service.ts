import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../main/services/auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = "null";
        try {
            token = localStorage.getItem('token');
        } catch (e) { }

        if (token !== null) {
            request = request.clone({
                setHeaders: {
                     Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
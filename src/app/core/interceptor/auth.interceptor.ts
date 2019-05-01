import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService, private router: Router, private userService: UserService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.getToken()) {
            request = request.clone({
                setHeaders: {
                    'X-Auth-Token': `${this.auth.getToken().id}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((error, caught) => {
                this.handleAuthError(error);
                return of(error);
            }) as any);
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            console.log('handled error ' + err.status);
            this.auth.removeToken();
            this.router.navigate([`/`]);
            return of(err.message);
        }
        throw err;
    }
}

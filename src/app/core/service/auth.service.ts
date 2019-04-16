import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginRequest, LoginResponse, RegisterRequest, Token} from '../model/user/login';
import {ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error';
import {UserService} from './user.service';
import {User} from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ENDPOINT = environment.API_URL;
  private authenticated: boolean;
  private TOKEN_KEY = 'authtoken';

  authChange: Subject<boolean> = new Subject<boolean>();
  constructor(
      private http: HttpClient,
      private userService: UserService,
      private router: Router,
      private toastr: ToastrService
  ) {
    this.authenticated = !!this.getToken();
    this.authChange.subscribe((value) => {
      this.authenticated = value;
    });
  }
  setAuthenticated(value: boolean) {
    this.authChange.next(value);
  }
  getAuthenticated(): boolean {
    return this.authenticated;
  }
  setToken(token: Token): void {
    localStorage.setItem(this.TOKEN_KEY, token.id + ';' + token.expiry);
  }
  getToken(): Token {
    const tokenString = localStorage.getItem(this.TOKEN_KEY);
    if (!tokenString) { return null; }
    const tokenParts = tokenString.split(';');
    const token = tokenParts[0];
    const expiry: Date = new Date(tokenParts[1]);
    if (new Date().getTime() > expiry.getTime()) {
      this.removeToken();
      this.userService.setUserData(null);
      return null;
    }
    return (
        {
          id: token,
          expiry: expiry,
          email: null
        });
  }
  removeToken(): void {
    this.setAuthenticated(false);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loginRequest(request: LoginRequest): Observable<LoginResponse> {
    return new Observable(observer => {
      this.http.post(this.ENDPOINT + '/login', request).subscribe(
          (data: LoginResponse) => {
            this.setToken(data.token);
            this.authenticated = true;
            this.userService.setUserData(data.user);
            return observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  forgotPasswordRequest(email): Observable<any> {
    return new Observable(observer => {
      this.http.post(this.ENDPOINT + '/forgotpassword', email).subscribe(
          (data) => {
            observer.next(data);
          }, (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  register(request: RegisterRequest): Observable<User> {
    return new Observable(observer => {
      this.http.post(this.ENDPOINT + '/register', request).subscribe(
          (data: User) => {
            return observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  logoutRequest(): Observable<any> {
    return new Observable(observer => {
      this.http.post(this.ENDPOINT + '/logout', {}).subscribe(
          (data: any) => {
            this.removeToken();
            this.userService.setUserData(null);
            this.router.navigate(['/']);
          }, (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  handleError(observer, error: ErrorResponse) {
    observer.error(error);
  }
}

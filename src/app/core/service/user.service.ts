import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user/user';
import {environment} from '../../../environments/environment';
import {Role} from '../model/user/role';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private STORAGE_KEY = 'userdata';
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  private ENDPOINT = environment.API_URL + '/users';
  users: BehaviorSubject<User[]> = new BehaviorSubject([]);
  roles: Role[] = [];
  enabledFilter = null;
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {
    const storageString = localStorage.getItem(this.STORAGE_KEY);
    if (storageString) {
      this.currentUser.next(JSON.parse(storageString));
    }
  }
  public getProfile(): Observable<User> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/profile').subscribe(
          (data: User) => {
            this.setUserData(data);
            if (!data.passwordChanged) {
              this.router.navigate(['/profile', { password: 'show' }]);
            }
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }
  public setUserData(user: User) {
    if (!user) {
      localStorage.removeItem(this.STORAGE_KEY);
    } else {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    this.currentUser.next(user);
  }

  handleError(observer, error: ErrorResponse) {
    this.toastr.error(error.error.errorDescription, 'Viga!');
    observer.error(error);
  }

}

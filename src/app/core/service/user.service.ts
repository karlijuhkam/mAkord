import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserFilter} from '../model/user/user';
import {environment} from '../../../environments/environment';
import {Role, RoleType} from '../model/user/role';
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

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {
    const storageString = localStorage.getItem(this.STORAGE_KEY);
    if (storageString) {
      this.currentUser.next(JSON.parse(storageString));
    }
  }

  public getUsers(filter: UserFilter): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.ENDPOINT, {params: filter.getParams()}).subscribe(
          (data) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  public getProfile(): Observable<User> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/profile').subscribe(
          (data: User) => {
            this.setUserData(data);
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

  public getTopUsers(): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/topusers').subscribe(
          (data: any) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  public isAdmin() {
    return this.currentUser.value && this.currentUser.value.roles.map(role => role.name).indexOf(RoleType.admin) !== -1;
  }

  public isModerator() {
    return this.currentUser.value && this.currentUser.value.roles.map(role => role.name).indexOf(RoleType.moderator) !== -1;
  }

  handleError(observer, error: ErrorResponse) {
    this.toastr.error(error.error.errorDescription, 'Viga!');
    observer.error(error);
  }

}

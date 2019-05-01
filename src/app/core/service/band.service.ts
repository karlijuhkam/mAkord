import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorResponse} from '../model/error';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(private router: Router, private http: HttpClient) { }

  public getAllBands(): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/allbands').subscribe(
          (data: any) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  private handleError(observer, error: ErrorResponse) {
    observer.error(error);
  }
}

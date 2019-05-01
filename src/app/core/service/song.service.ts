import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {ErrorResponse} from '../model/error';
import {environment} from '../../../environments/environment';
import {Song} from '../model/song/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  public getActiveSongById(id): Observable<Song> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/activesongs/' + id).subscribe(
          (data: Song) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  public getPopularSongs(): Observable<any> {
      return new Observable(observer => {
          this.http.get(environment.API_URL + '/popularsongs').subscribe(
              (data: any) => {
                  observer.next(data);
              },
              (err: ErrorResponse) => this.handleError(observer, err)
          );
      });
  }

  public getRecentSongs(): Observable<any> {
      return new Observable(observer => {
          this.http.get(environment.API_URL + '/recentsongs').subscribe(
              (data: any) => {
                  observer.next(data);
              },
              (err: ErrorResponse) => this.handleError(observer, err)
          );
      });
  }

  public likeUnlikeSong(id): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/likesong/' + id).subscribe(
          (data) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

  public checkIfLiked(id): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/likecheck/' + id).subscribe(
          (data) => {
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

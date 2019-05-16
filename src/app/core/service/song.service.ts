import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {ErrorResponse} from '../model/error';
import {environment} from '../../../environments/environment';
import {Song, SongFilter, SongRequest} from '../model/song/song';
import {UserFilter} from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  public getSongs(filter: SongFilter): Observable<any> {
      return new Observable(observer => {
          this.http.get(environment.API_URL + '/songs', {params: filter.getParams()}).subscribe(
              (data) => {
                  observer.next(data);
              },
              (err: ErrorResponse) => this.handleError(observer, err)
          );
      });
  }

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

    public getAnySongById(id): Observable<Song> {
        return new Observable(observer => {
            this.http.get(environment.API_URL + '/songs/' + id).subscribe(
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

    public getSongsByBand(bandId): Observable<any> {
        return new Observable(observer => {
            this.http.get(environment.API_URL + '/bandsongs/' + bandId ).subscribe(
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

    public addSong(request: SongRequest, successMessage?: string): Observable<Song> {
        return new Observable(observer => {
            this.http.post(environment.API_URL + '/songs', request).subscribe(
                (data: Song) => {
                    if (successMessage) {
                        this.toastr.success(successMessage);
                    }
                    observer.next(data);
                },
                (err: ErrorResponse) => this.handleError(observer, err)
            );
        });
    }

    public patchSong(request: SongRequest, id, successMessage?: string): Observable<Song> {
        return new Observable(observer => {
            this.http.patch(environment.API_URL + '/songs/' + id, request).subscribe(
                (data: Song) => {
                    if (successMessage) {
                        this.toastr.success(successMessage);
                    }
                    observer.next(data);
                },
                (err: ErrorResponse) => this.handleError(observer, err)
            );
        });
    }

    public deleteSong(id, successMessage?: string): Observable<Song> {
        return new Observable(observer => {
            this.http.delete(environment.API_URL + '/songs/' + id).subscribe(
                (data: Song) => {
                    if (successMessage) {
                        this.toastr.success(successMessage);
                    }
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

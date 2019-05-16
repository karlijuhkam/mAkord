import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorResponse} from '../model/error';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Song, SongFilter, SongRequest} from '../model/song/song';
import {Band, BandFilter, BandRequest} from '../model/band/band';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(private router: Router, private http: HttpClient,
              private toastr: ToastrService) { }

  public getBands(filter: BandFilter): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/bands', {params: filter.getParams()}).subscribe(
          (data) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

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

  public getBandById(id): Observable<any> {
    return new Observable(observer => {
      this.http.get(environment.API_URL + '/allbands/' + id).subscribe(
          (data: any) => {
            observer.next(data);
          },
          (err: ErrorResponse) => this.handleError(observer, err)
      );
    });
  }

    public addBand(request: BandRequest, successMessage?: string): Observable<Band> {
        return new Observable(observer => {
            this.http.post(environment.API_URL + '/bands', request).subscribe(
                (data: Band) => {
                    if (successMessage) {
                        this.toastr.success(successMessage);
                    }
                    observer.next(data);
                },
                (err: ErrorResponse) => this.handleError(observer, err)
            );
        });
    }

    public patchBand(request: BandRequest, id, successMessage?: string): Observable<Band> {
        return new Observable(observer => {
            this.http.patch(environment.API_URL + '/bands/' + id, request).subscribe(
                (data: Band) => {
                    if (successMessage) {
                        this.toastr.success(successMessage);
                    }
                    observer.next(data);
                },
                (err: ErrorResponse) => this.handleError(observer, err)
            );
        });
    }

    public deleteBand(id, successMessage?: string): Observable<Band> {
        return new Observable(observer => {
            this.http.delete(environment.API_URL + '/bands/' + id).subscribe(
                (data: Band) => {
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

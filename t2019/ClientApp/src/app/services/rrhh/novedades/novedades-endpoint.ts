import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';

@Injectable()
export class NovedadesEndPoint {

  /* Variables para llamar a API */
  private readonly _urlNovedades: string = '/api/novedades';

  constructor(private http: HttpClient) { }

  protected getRequestHeaders(params?: any): HttpHeaders {
    // let headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + '',
    //   'Content-Type': 'application/json',
    //   'Accept': `application/json, text/plain, */*`,
    //   'App-Version': '1.0'
    // });

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getnovedades(dateTimeEntity: DateTimeEntity) {
    let endpointUrl = this._urlNovedades + '/getnovedades';
    const params = new HttpParams()
      .set('objeto', JSON.stringify(dateTimeEntity));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

}

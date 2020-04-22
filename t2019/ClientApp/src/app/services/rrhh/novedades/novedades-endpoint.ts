import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';

@Injectable()
export class NovedadesEndPoint {

  /* Variables para llamar a API */
  private readonly _urlNovedades: string = '/api/novedades';

  constructor(private http: HttpClient) { }

  protected getRequestHeaders(params?: any): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + '',
      'Content-Type': 'application/json',
      'Accept': `application/json, text/plain, */*`,
      'App-Version': '1.0'
    });

    return headers;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getnovedades<T>(dateTimeEntity: DateTimeEntity): Observable<T> {
    let endpointUrl = this._urlNovedades + '/getnovedades';
    const params = new HttpParams()
      .set('objeto', JSON.stringify(dateTimeEntity));

    return this.http.get<T>(endpointUrl, { params: params }).pipe<T>(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListJornadasEndPoint<T>(filtro?): Observable<T> {
    let endpointUrl = this._urlNovedades + '/getListJornadas';
    const params = new HttpParams()
      .set('filtro', (filtro) ? filtro : '');

    return this.http.get<T>(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe<T>(
      catchError(error => {
        return this.handleError(error);
      }));
  }

}

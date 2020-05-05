import { ParamEntity } from 'src/app/models/general/param.model';
import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';

@Injectable({
  providedIn: 'root'
})
export class NovedadesEndPoint {

  /* Variables para llamar a API */
  private readonly _urlNovedades: string = '/api/novedades';

  constructor(private http: HttpClient) { }

  protected getRequestHeaders() {
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

  getNovedades(filtro?): Observable<Novedades[]> {
    let endpointUrl = this._urlNovedades + '/getnovedades';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(filtro));

    return this.http.get<Novedades[]>(endpointUrl, { params: params }).pipe<Novedades[]>(
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

  getListIncidenciasEndPoint<T>(filtro?): Observable<T> {
    let endpointUrl = this._urlNovedades + '/getListIncidencias';
    const params = new HttpParams()
      .set('filtro', (filtro) ? JSON.stringify(filtro) : '');

    return this.http.get<T>(endpointUrl, { headers:  this.getRequestHeaders(), params: params }).pipe<T>(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListMarcacionesEndPoint<T>(param?: ParamEntity): Observable<T> {
    let endpointUrl = this._urlNovedades + '/getListMarcaciones';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get<T>(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe<T>(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  /*------------POST--------------*/

  guardarJornada(param: ParamEntity): Observable<any> {

    let endPointUrl = this._urlNovedades + '/guardarJornada';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders()}).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarIncidencia(param: ParamEntity): Observable<any> {
    let endPointUrl = this._urlNovedades + '/guardarIncidencia';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  anularMarcacionEndPoint(param: ParamEntity): Observable<any> {
    let endPointUrl = this._urlNovedades + '/anularMarcacion';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarMarcacion(param: ParamEntity) {
    let endPointUrl = this._urlNovedades + '/guardarMarcacion';
console.log(JSON.stringify(param));
    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

}

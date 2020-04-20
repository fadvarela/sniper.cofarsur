import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NominaEndPoint {

  /* Variables para llamar a API */
  private readonly _urlNomina: string = '/api/nomina';

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

  getnomina(param?: any) {
    let endpointUrl = this._urlNomina + '/getnomina';
    const params = new HttpParams()
      .set('param', (param) ? param : 0);

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

}

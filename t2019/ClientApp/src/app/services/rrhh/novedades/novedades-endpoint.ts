import { timeout } from 'rxjs/operators';
import { JornadaHabitual } from './../../../models/rrhh/novedades/jornada-habitual.model';
import { ParamEntity } from 'src/app/models/general/param.model';
import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, TimeoutError } from 'rxjs';
import { Injectable } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';

@Injectable({
  providedIn: 'root'
})
export class NovedadesEndPoint {

  /* Variables para llamar a API */
  private readonly _urlNovedades: string = '/api/novedades';

  constructor(private http: HttpClient) { }

  protected getRequestHeaders() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + '',
      'Content-Type': 'application/json',
      'Accept': `application/json, text/plain, */*`,
      'App-Version': '1.0',
      timeout: `${100000}`
    });

    return headers;
  }

  handleError(error: HttpErrorResponse) {
    if (error instanceof TimeoutError) {
      return throwError('En este momento no podemos realizar la operación. Por favor intente nuevamente más tarde.');
    }
    return throwError(error);
  }

  getNovedades(filtro) {
    const endpointUrl = this._urlNovedades + '/getnovedades';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(filtro));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListJornadasEndPoint(filtro) {
    const endpointUrl = this._urlNovedades + '/getListJornadas';
    const params = new HttpParams()
      .set('filtro', (filtro) ? filtro : '');

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListIncidenciasEndPoint(filtro?) {
    const endpointUrl = this._urlNovedades + '/getListIncidencias';
    const params = new HttpParams()
      .set('filtro', (filtro) ? JSON.stringify(filtro) : '');

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListPatologiasEndPoint(filtro) {
    const endpointUrl = this._urlNovedades + '/getListPatologias';
    const params = new HttpParams()
      .set('filtro', (filtro) ? JSON.stringify(filtro) : '');

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListMarcacionesEndPoint<T>(param?): Observable<T> {
    const endpointUrl = this._urlNovedades + '/getListMarcaciones';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get<T>(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe<T>(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getListJornadasHabitualesEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getListJornadasHabituales';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getIncidenciasJustificacionesEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getIncidenciasJustificaciones';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getNominaGrillaEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getNominaGrilla';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getJustificacionGrillaEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getJustificacionGrilla';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getIncidenciasGrillaEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getIncidenciasGrillaModal';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getNovedadesAvisosGrillaEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getNovedadesAvisos';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getVacacionesListEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getVacacionesList';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getSaldosVacacionesListEndPoint(param?) {
    const endpointUrl = this._urlNovedades + '/getSaldosVacacionesList';
    const params = new HttpParams()
      .set('filtro', JSON.stringify(param));

    return this.http.get(endpointUrl, { headers: this.getRequestHeaders(), params: params }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }


  /*------------POST--------------*/

  guardarJornada(param): Observable<any> {
    const endPointUrl = this._urlNovedades + '/guardarJornada';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarIncidencia(param): Observable<any> {
    const endPointUrl = this._urlNovedades + '/guardarIncidencia';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  anularMarcacionEndPoint(param): Observable<any> {
    const endPointUrl = this._urlNovedades + '/anularMarcacion';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarMarcacion(param) {
    const endPointUrl = this._urlNovedades + '/guardarMarcacion';

    return this.http.post(endPointUrl, JSON.stringify(param), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarJornadaHabitualEndPoint(params) {
    const endPointUrl = this._urlNovedades + '/guardarJornadaHabitual';

    return this.http.post(endPointUrl, JSON.stringify(params), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  updJustificacionEndPoint(params) {
    const endPointUrl = this._urlNovedades + '/updJustificacion';

    return this.http.post(endPointUrl, JSON.stringify(params), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  guardarAvisoEndPoint(params) {
    const endPointUrl = this._urlNovedades + '/guardarAviso';

    return this.http.post(endPointUrl, JSON.stringify(params), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  anularAvisoEndPoint(params) {
    const endPointUrl = this._urlNovedades + '/anularAviso';

    return this.http.post(endPointUrl, JSON.stringify(params), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  updVacacionEndPoint(params) {
    const endPointUrl = this._urlNovedades + '/updVacacion';

    return this.http.post(endPointUrl, JSON.stringify(params), { headers: this.getRequestHeaders() }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }



  DownloadFile(param?: ResponseHelper) {
    let filename = param.Downfilename;

    this.getImage(param.Url).subscribe((data: Blob) => {
      //debugger;
      let item = filename[filename.length - 1];

      let checkFileType = item.split('.').pop();
      var fileType: any;
      if (checkFileType == "txt") {
        fileType = "text/plain";
      }
      if (checkFileType == "pdf") {
        fileType = "application/pdf";
      }
      if (checkFileType == "doc") {
        fileType = "application/vnd.ms-word";
      }
      if (checkFileType == "docx") {
        fileType = "application/vnd.ms-word";
      }
      if (checkFileType == "xls") {
        fileType = "application/vnd.ms-excel";
      }
      if (checkFileType == "xlsx") {
        fileType = "application/vnd.ms-excel";
      }
      if (checkFileType == "png") {
        fileType = "image/png";
      }
      if (checkFileType == "jpg") {
        fileType = "image/jpeg";
      }
      if (checkFileType == "jpeg") {
        fileType = "image/jpeg";
      }
      if (checkFileType == "gif") {
        fileType = "image/gif";
      }
      if (checkFileType == "csv") {
        fileType = "text/csv";
      }
      if (checkFileType == "amr") {
        fileType = "AMR-WB";
      }
      var blob = new Blob([data], { type: 'application/pdf' })
      const blob1: Blob = data;
      const objectUrl: string = URL.createObjectURL(blob);
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    })
  }

  getImage(imageUrl: string): Observable<any> {
    const endPointUrl = this._urlNovedades + '/DownFile';

    const params = new HttpParams()
      .set('filtro', JSON.stringify(imageUrl));

    return this.http.get(endPointUrl, { headers: this.getRequestHeaders(), params: params, responseType: 'arraybuffer'  }).pipe(
      catchError(error => {
        return this.handleError(error);
      }));

   // return this.http.get(this._urlNovedades + '/' , { headers: this.getRequestHeaders(), responseType: 'arraybuffer' });
  }



}

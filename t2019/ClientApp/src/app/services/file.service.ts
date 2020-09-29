import { FileEntity } from './../models/general/file.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError, TimeoutError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { ResponseHelper } from "../models/sistema/responseHelper";
import { NovedadesEndPoint } from 'src/app/services/rrhh/novedades/novedades-endpoint';
import { ParamEntity } from "../models/general/param.model";
import { LoadingInterceptorService } from './utils/loader-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  /* Variables para llamar a API */
  private readonly _urlArchivos: string = '/api/file';

  constructor(private http: HttpClient, private loadingInterceptorService: LoadingInterceptorService) { }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof TimeoutError) {
      return throwError('En este momento no podemos realizar la operación. Por favor intente nuevamente más tarde.');
    }
    return throwError(error);
  }

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

  downloadPdf(params?: FileEntity) {
    this.loadingInterceptorService.toggleSpinner(); // ACTIVO EL SPINNER
    const sub = new Subject<boolean>();

    const url = `${this._urlArchivos}/descargaArchivo`;

    const paramsEndPoint = new HttpParams()
      .set('filtro', JSON.stringify(params.Url));

    this.http.get(url, { headers: this.getRequestHeaders(), params: paramsEndPoint, responseType: 'arraybuffer' })
      .pipe(
        catchError(error => {
          return this.handleError(error);
        })).subscribe((fileResponse) => {
          if (fileResponse) {
            this.printFile(fileResponse, params);
            sub.next(true);
          } else {
            sub.error(false);
          }
        });

    return sub;
  }

  private printFile(fileResponse, param: FileEntity) {
    var blob = new Blob([fileResponse], { type: 'application/pdf' })
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = param.Filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
    this.loadingInterceptorService.toggleSpinner(); // ACTIVO EL SPINNER
  }

}

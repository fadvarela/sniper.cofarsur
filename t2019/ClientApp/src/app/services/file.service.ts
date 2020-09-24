import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError, TimeoutError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ResponseHelper } from "../models/sistema/responseHelper";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof TimeoutError) {
      return throwError('En este momento no podemos realizar la operación. Por favor intente nuevamente más tarde.');
    }
    return throwError(error);
  }

  downloadPdf(param?: ResponseHelper): Observable<boolean> {
    const sub = new Subject<boolean>();

    this.http.get(param.Url, { responseType: 'arraybuffer' }).subscribe((response: any) => {
      if (response !== 0) {
        const byteArray = new Uint8Array(response);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        this.saveFile(blob, param.Downfilename);

        sub.next(true);
        sub.complete();
      } else {
        sub.error(false);
      }
    }, (error) => {
      catchError(error => {
        return this.handleError(error);
      })
    });

    return sub;
  }

  private saveFile(blob, filename) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    // downloadLink.download = `${new Date().toString().substring(0, 33)}_comprobante`;
    downloadLink.download = filename;
    downloadLink.click();
  }
}

import { Injectable, Inject, InjectionToken } from "@angular/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, BehaviorSubject } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { map, tap, timeout } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  contador = 0;
  private isSpinnerOpen = false;

  constructor(
    private router: Router,
    private spinnerNgx: NgxSpinnerService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  toggleSpinner() {
    (!this.isSpinnerOpen) ? this.spinnerNgx.show() : this.spinnerNgx.hide();
    this.isSpinnerOpen = !this.isSpinnerOpen;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    if (this.router.url !== '/login') {
      this.spinnerNgx.show();
      this.contador++;
      this.isSpinnerOpen = true;
    }
    return next
      .handle(req)
      .pipe(
        timeout(timeoutValueNumeric),
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerNgx.hide();
            this.isSpinnerOpen = false;
          }
        }, (error) => {
          this.spinnerNgx.hide();
          this.isSpinnerOpen = false;
        })
      );

  }

}

import { Injectable } from "@angular/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, BehaviorSubject } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  contador = 0;
  isSpinnerOpen = false;

  constructor(
    private router: Router,
    private spinnerNgx: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.router.url !== '/login') {
      this.spinnerNgx.show();
      this.contador++;
      this.isSpinnerOpen = true;
    }
    return next
      .handle(req)
      .pipe(
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

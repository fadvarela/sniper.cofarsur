import { UserValuesService } from './services/utils/user-values.service';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { LoadingInterceptorService } from './services/utils/loader-interceptor.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn: Observable<boolean>;

  constructor(
    private spinnerService: LoadingInterceptorService,
    private userValuesService: UserValuesService,
    private dateAdapter?: DateAdapter<any>,
  ) {
    this.dateAdapter.setLocale('es');
    // Obtengo el estado del login con el observable y en el html
    // pregunto si este estado devuelve TRUE o FALSE
    this.isLoggedIn = this.userValuesService.isLoggedInBehavior;
  }

}

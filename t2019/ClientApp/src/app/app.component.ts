import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { LoadingInterceptorService } from './services/utils/loader-interceptor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private spinnerService: LoadingInterceptorService,
    private dateAdapter?: DateAdapter<any>,
  ) {
    this.dateAdapter.setLocale('es');
  }

  title = 'app';
}

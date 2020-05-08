import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dateAdapter?: DateAdapter<any>) {
    this.dateAdapter.setLocale('es');
  }

  title = 'app';
}

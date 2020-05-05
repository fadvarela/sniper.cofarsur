import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerModule, NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
// declare var require: any;
@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {
  txtTimePicker;
  @Input() setDarkMode = false;
  tiempoActual: string;
  @Input() isDisabled: boolean;
  @Output() timePickerEmit = new EventEmitter();

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  constructor() {
    // this.convertirDateAtime();
  }

  ngOnInit() {

  }

  getTimeValueEmit(value) {
    this.timePickerEmit.emit(value);
  }

  convertirDateAtime() {
    let dateFormat = require('dateformat');
    let now = new Date();
    this.tiempoActual = dateFormat(now, 'HH:MM');
  }

}

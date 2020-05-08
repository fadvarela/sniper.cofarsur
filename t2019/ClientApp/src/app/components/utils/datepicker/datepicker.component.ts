import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import * as _moment from 'moment';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Output() dateEmit = new EventEmitter;
  @Input() dateInput;
  hoyDate = new Date(); // solo se usa para setear un maximo al datepicker
  // dateFormat = require('dateformat'); // RESPALDO
  fechaCtrl: FormControl; //  = new FormControl((new Date()).toISOString());

  constructor(private dateAdapter?: DateAdapter<any>) { }

  ngOnInit() {
    this.fechaCtrl = (this.dateInput) ?
      new FormControl((new Date(this.dateInput)).toISOString()) :
      new FormControl(new Date().toISOString());
  }

  ngOnDestroy() {
  }

  getDateEmit() {
    this.dateEmit.emit(this.fechaCtrl.value);
  }

}

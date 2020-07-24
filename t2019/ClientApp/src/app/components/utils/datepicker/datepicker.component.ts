import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, OnChanges } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import * as _moment from 'moment';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Output() dateEmit = new EventEmitter;
  @Input() dateInput;
  @Input() dateLabel;
  @Input() maxDate = new Date(); // solo se usa para setear un maximo al datepicker
  @Input() minDate;
  @Input() dateClass;
  @Input() emitOnInit: boolean;
  @Input() disabled = false;
  @Input() fechaCtrl: FormControl; //  = new FormControl((new Date()).toISOString());
  @Input() fullWidth = false;

  constructor(private dateAdapter?: DateAdapter<any>) { }

  ngOnInit() {
    this.getNewDate();
    if (this.emitOnInit) {
      this.getDateEmit();
    }
    this.toggleDisabled();
  }

  ngOnChanges() {
    this.getNewDate();
    this.toggleDisabled();
  }

  getNewDate() {
    this.fechaCtrl = (this.dateInput) ?
      new FormControl((new Date(this.dateInput)).toISOString()) :
      new FormControl(new Date().toISOString());
  }

  toggleDisabled() {
    if (this.disabled) {
      this.fechaCtrl.disable();
    } else {
      this.fechaCtrl.enable();
    }
  }

  getDateEmit() {
    this.dateEmit.emit(this.fechaCtrl.value);
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import * as _moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Output() dateEmit = new EventEmitter;
  datePicker = new Date();
  hoyDate = new Date();



  constructor() { }

  ngOnInit() {
  }

  getDateEmit() {
    this.datePicker = new Date(this.datePicker);

    let dateEntity = new DateTimeEntity();
    dateEntity.dia = this.datePicker.getDate();
    dateEntity.mes = this.datePicker.getMonth() + 1;
    dateEntity.anio = this.datePicker.getFullYear();

    this.dateEmit.emit(dateEntity);
  }

}

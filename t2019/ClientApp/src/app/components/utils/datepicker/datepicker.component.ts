import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import * as _moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  @Output() dateEmit = new EventEmitter;
  @Input() getDateInput;
  datePicker = new Date();
  hoyDate = new Date(); // solo se usa para setear un maximo al datepicker
  dateEntity = new DateTimeEntity(); // se usa como dato a enviar Emit


  constructor() { }

  ngOnInit() {
  }

  getDateEmit(valor) {
    this.convertirDateEntity(valor);
    this.dateEmit.emit(this.dateEntity);
  }

  convertirDateEntity(valor) {
    this.datePicker = new Date(valor);
    this.dateEntity.dia = this.datePicker.getDate();
    this.dateEntity.mes = this.datePicker.getMonth() + 1;
    this.dateEntity.anio = this.datePicker.getFullYear();
    return this.dateEntity;
  }

}

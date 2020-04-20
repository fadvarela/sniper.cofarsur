
import { Injectable, OnInit } from '@angular/core';
import { NovedadesEndPoint } from 'src/app/services/rrhh/novedades/novedades-endpoint';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';

@Injectable()
export class NovedadesService implements OnInit {

  constructor(private novedadesEndPoint: NovedadesEndPoint) {
  }

  ngOnInit() {

  }


  getnovedades(ateTimeEntity: DateTimeEntity) {
    var result = this.novedadesEndPoint.getnovedades(ateTimeEntity);
    return result;
  }

}

import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { Observable } from 'rxjs';

import { Injectable, OnInit } from '@angular/core';
import { NovedadesEndPoint } from 'src/app/services/rrhh/novedades/novedades-endpoint';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { map } from 'rxjs/operators';

@Injectable()
export class NovedadesService {

  constructor(private novedadesEndPoint: NovedadesEndPoint) {
  }


  getnovedades(ateTimeEntity: DateTimeEntity) {
    return this.novedadesEndPoint.getnovedades(ateTimeEntity);
    // .pipe(
    //   map(response => {
    //     return this.getnovedadesFromResponse(response);
    //   })
    // );
  }

  getListJornadas(filtro?): Observable<CmbEntity[]> {
    return this.novedadesEndPoint.getListJornadasEndPoint(filtro);
  }

  private getnovedadesFromResponse(response) {
    let novedades: Novedades[] = [];

    for (let i in response) {
      novedades[i] = Novedades.Create(response[i]);
    }
    return novedades;
  }

}

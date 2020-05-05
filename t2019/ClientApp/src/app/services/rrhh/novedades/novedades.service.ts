import { ParamEntity } from 'src/app/models/general/param.model';
import { Marcacion } from './../../../models/rrhh/marcacion.model';
import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { Observable } from 'rxjs';
import { Injectable, OnInit,Output,EventEmitter } from '@angular/core';
import { NovedadesEndPoint } from 'src/app/services/rrhh/novedades/novedades-endpoint';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { map } from 'rxjs/operators';

@Injectable()
export class NovedadesService {
  constructor(private novedadesEndPoint: NovedadesEndPoint) {
  }


  getNovedades(filtro?) {
    var result=this.novedadesEndPoint.getNovedades(filtro);
      return result;
  }

  getListJornadas(filtro?): Observable<CmbEntity[]> {
    return this.novedadesEndPoint.getListJornadasEndPoint(filtro);
  }

  getListIncidencias(filtro?): Observable<CmbEntity[]> {
    return this.novedadesEndPoint.getListIncidenciasEndPoint(filtro);
  }

  getListMarcaciones(params?: ParamEntity): Observable<Marcacion[]> {
    return this.novedadesEndPoint.getListMarcacionesEndPoint(params);
  }

  /*--------POST-----------*/

  guardarJornada(params: ParamEntity) {
    return this.novedadesEndPoint.guardarJornada(params);
  }

  guardarIncidencia(params: ParamEntity) {
    return this.novedadesEndPoint.guardarIncidencia(params);
  }

  anularMarcacion(params: ParamEntity) {
    return this.novedadesEndPoint.anularMarcacionEndPoint(params);
  }

  guardarMarcacion(params: ParamEntity) {
    return this.novedadesEndPoint.guardarMarcacion(params);
  }

}

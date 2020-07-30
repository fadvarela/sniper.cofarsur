import { Justificacion } from 'src/app/models/rrhh/justificacion.model';
import { ParamEntity } from 'src/app/models/general/param.model';
import { Marcacion } from './../../../models/rrhh/marcacion.model';
import { CmbEntity } from './../../../models/general/cmbEntity.model';
import { Observable } from 'rxjs';
import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { NovedadesEndPoint } from 'src/app/services/rrhh/novedades/novedades-endpoint';
import { DateTimeEntity } from 'src/app/models/sistema/dateTimeEntity';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { map } from 'rxjs/operators';
import { JornadaHabitual } from 'src/app/models/rrhh/novedades/jornada-habitual.model';

@Injectable()
export class NovedadesService {
  constructor(private novedadesEndPoint: NovedadesEndPoint) {
  }

  getNovedades(filtro?) {
    return this.novedadesEndPoint.getNovedades(filtro);
  }

  getListJornadas(filtro?) {
    return this.novedadesEndPoint.getListJornadasEndPoint(filtro);
  }

  getListIncidencias(filtro?) {
    return this.novedadesEndPoint.getListIncidenciasEndPoint(filtro);
  }

  getListPatologias(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getListPatologiasEndPoint(params);
  }

  getListMarcaciones(params?: ParamEntity<any>): Observable<Marcacion[]> {
    return this.novedadesEndPoint.getListMarcacionesEndPoint(params);
  }

  getListJornadasHabituales(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getListJornadasHabitualesEndPoint(params);
  }

  getIncidenciasJustificaciones(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getIncidenciasJustificacionesEndPoint(params);
  }

  getNominaGrilla(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getNominaGrillaEndPoint(params);
  }

  getJustificacionGrilla(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getJustificacionGrillaEndPoint(params);
  }

  getIncidenciasGrilla(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getIncidenciasGrillaEndPoint(params);
  }

  getNovedadesAvisosGrilla(params?: ParamEntity<any>) {
    return this.novedadesEndPoint.getNovedadesAvisosGrillaEndPoint(params);
  }
  

  /*--------POST-----------*/

  guardarJornada(params: ParamEntity<any>) {
    return this.novedadesEndPoint.guardarJornada(params);
  }

  guardarIncidencia(params: ParamEntity<any>) {
    return this.novedadesEndPoint.guardarIncidencia(params);
  }

  anularMarcacion(params: ParamEntity<any>) {
    return this.novedadesEndPoint.anularMarcacionEndPoint(params);
  }

  guardarMarcacion(params: ParamEntity<any>) {
    return this.novedadesEndPoint.guardarMarcacion(params);
  }

  guardarJornadaHabitual(params: ParamEntity<any>) {
    return this.novedadesEndPoint.guardarJornadaHabitualEndPoint(params);
  }

  updJustificacion(params: ParamEntity<Justificacion>) {
    return this.novedadesEndPoint.updJustificacionEndPoint(params);
  }

  guardarAviso(params: ParamEntity<any>) {
    return this.novedadesEndPoint.guardarAvisoEndPoint(params);
  }

  anularAviso(params: ParamEntity<any>) {
    return this.novedadesEndPoint.anularAvisoEndPoint(params);
  }

}

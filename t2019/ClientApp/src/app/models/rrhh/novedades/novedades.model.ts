import { DateTimeEntity } from './../../sistema/dateTimeEntity';
import { Nomina } from 'src/app/models/rrhh/nomina.model';

export class Novedades extends Nomina {
  public Seccion: string;
  public IdJornada: number;
  public Njornada: string;
  public IdIncidencia: number;
  public Nincidencia: string;
  public Marcaciones: string;
  public Hteoricas: number;
  public Htrabajadas: number;
  public Iimpares: number;
  public IsinIncidencias: number;
  public Hadicionales: number;
  public Hausencia: number;
  public Fecha: DateTimeEntity;

  // constructor(idLegajo?: number, apellido?: string, nombre?: string, fechaNacimiento?: Date,
  //   cuil?: number, seccion?: string, idJornada?: number, nJornada?: string, idIncidencia?: number,
  //   nIncidencia?: string, marcaciones?: string, hTeoricas?: number, hTrabajadas?: number,
  //   iImpares?: number, isinIncidencias?: number, hAdicionales?: number, hAusencia?: number) {
  //   super(idLegajo, apellido, nombre, fechaNacimiento, cuil);
  //   this.seccion = seccion;
  //   this.idJornada = idJornada;
  //   this.nJornada = nJornada;
  //   this.idIncidencia = idIncidencia;
  //   this.nIncidencia = nIncidencia;
  //   this.marcaciones = marcaciones;
  //   this.hTeoricas = hTeoricas;
  //   this.hTrabajadas = hTrabajadas;
  //   this.iImpares = iImpares;
  //   this.isinIncidencias = isinIncidencias;
  //   this.hAdicionales = hAdicionales;
  //   this.hAusencia = hAusencia;
  // }
}

import { Nomina } from 'src/app/models/rrhh/nomina.model';

export class Novedades extends Nomina {
  public idJornada: number;
  public nJornada: string;
  public idIncidencia: number;
  public nIncidencia: string;
  public marcaciones: string;
  public hTeoricas: number;
  public hTrabajadas: number;
  public iImpares: number;
  public isinIncidencias: number;
  public hAdicionales: number;
  public hAusencia: number;
  public fecha: Date;

  constructor(idLegajo?: number, apellido?: string, nombre?: string, fechaNacimiento?: Date,
    cuil?: number, idJornada?: number, nJornada?: string, idIncidencia?: number,
    nIncidencia?: string, marcaciones?: string, hTeoricas?: number, hTrabajadas?: number,
    iImpares?: number, isinIncidencias?: number, hAdicionales?: number, hAusencia?: number) {
    super(idLegajo, apellido, nombre, fechaNacimiento, cuil);
    this.idJornada = idJornada;
    this.nJornada = nJornada;
    this.idIncidencia = idIncidencia;
    this.nIncidencia = nIncidencia;
    this.marcaciones = marcaciones;
    this.hTeoricas = hTeoricas;
    this.hTrabajadas = hTrabajadas;
    this.iImpares = iImpares;
    this.isinIncidencias = isinIncidencias;
    this.hAdicionales = hAdicionales;
    this.hAusencia = hAusencia;
  }

  // public static Create(data: {}) {
  //   let n = new Novedades();
  //   Object.assign(n, data);
  //   return n;
  // }

}

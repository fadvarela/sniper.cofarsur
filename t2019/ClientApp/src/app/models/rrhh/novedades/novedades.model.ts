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
  public iSinIncidencias: number;
  public hAdicionales: number;
  public hAusencia: number;

}

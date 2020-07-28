import { Novedades } from './novedades/novedades.model';
export class Aviso extends Novedades {
  Dias: number;
  IdAviso: number;
  IdEstado: number;
  IdPatologia: number;
  FechaDesde: Date;
}

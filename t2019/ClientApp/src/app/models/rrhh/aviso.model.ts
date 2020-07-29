import { Novedades } from './novedades/novedades.model';
export class Aviso extends Novedades {
  Dias: number;
  IdAviso: number;
  IdEstado: number;
  IdPatologia: number;
  Npatologia: string;
  FechaDesde: Date;
  FechaRegistro: Date;
  IdUsuarioFum: number;
  Nusuario: string;
  IdNovIncidencia: number;
}

import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';

export class Incidencia extends Novedades {
  IdEstado: number;
  Nestado: string;
  Npatologia: string;
  FechaModificacion: Date;
  IdUsuario: number;
  Nusuario: string;
}

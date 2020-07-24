
import { Marcacion } from './../rrhh/marcacion.model';
import { DateTimeEntity } from './../sistema/dateTimeEntity';
export class ParamEntity<T> {
  IdUsuario: number;
  FechaStr: string;
  FechaDate: Date;
  Fecha: DateTimeEntity;
  IdEmpresa: number;
  IdLegajo: number;
  IdJornada: number;
  IdIncidencia: number;
  GenericEntity: T;
  Tipo: any;
  IdPatologia: number;
}

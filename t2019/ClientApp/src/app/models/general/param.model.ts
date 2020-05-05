
import { Marcacion } from './../rrhh/marcacion.model';
import { DateTimeEntity } from './../sistema/dateTimeEntity';
export class ParamEntity {
  IdUsuario: number;
  FechaStr: string;
  FechaDate: Date;
  Fecha: DateTimeEntity;
  IdEmpresa: number;
  IdLegajo: number;
  IdJornada: number;
  IdIncidencia: number;
  MarcacionEntity: Marcacion = new Marcacion();
}

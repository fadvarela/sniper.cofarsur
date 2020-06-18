import { Nomina } from './nomina.model';

export class Justificacion extends Nomina {
  Legajo: number;
  IdIncidencia: number;
  Nincidencia: string;
  FechaDesde: Date;
  FechaHasta: Date;
  Observaciones: string;
  IdEstado: number;
  Nestado: string;
  Dias: number;
  IdJustificacion: number;
}

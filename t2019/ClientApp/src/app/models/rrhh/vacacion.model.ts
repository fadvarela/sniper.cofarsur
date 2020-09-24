import { Nomina } from "./nomina.model";

export class Vacacion extends Nomina {
  Legajo: number;
  IdIncidencia: number;
  Nincidencia: string;
  FechaDesde: Date;
  FechaHasta: Date;
  FechaRegistro: Date;
  Observaciones: string;
  IdEstado: number;
  Nestado: string;
  Dias: number;
  IdVacacion: number;
  IdPatologia: number;
  Npatologia: string;
  Anula: boolean;
  Periodo: string;
  Generados: any;
  Otorgados: any;
  IdJustificacion: number;
  DiasDevengados: number;
  DiasPercibidos: number;
  SaldoPeriodo: number;
  Seleccionado = false;
  Hovered: boolean;
  Anulacion: boolean = false;
}

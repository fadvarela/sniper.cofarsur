import { Nomina } from 'src/app/models/rrhh/nomina.model';

export class JornadaHabitual extends Nomina {
  Seccion: string;
  IdJlunes: number;
  NjLunes: string;
  IdJmartes: number;
  NjMartes: string;
  IdJmiercoles: number;
  NjMiercoles: string;
  IdJjueves: number;
  NjJueves: string;
  IdJviernes: number;
  NjViernes: string;
  IdJsabado: number;
  NjSabado: string;
  IdJdomingo: number;
  NjDomingo: string;
  HsSemanales: number;
  Dia: string;
}

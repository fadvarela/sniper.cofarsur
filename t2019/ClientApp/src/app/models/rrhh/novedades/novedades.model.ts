import { DateTimeEntity } from './../../sistema/dateTimeEntity';
import { Nomina } from 'src/app/models/rrhh/nomina.model';

export class Novedades extends Nomina {
  public Seccion: string;
  public IdJornada: number;
  public Njornada: string;
  public IdIncidencia: number;
  public Nincidencia: string;
  public Marcaciones: string;
  public Hteoricas: number;
  public Htrabajadas: number;
  public Iimpares: number;
  public IsinIncidencias: number;
  public Hadicionales: number;
  public Hausencia: number;
  public Fecha: DateTimeEntity;
  public FechaDate: Date;
}

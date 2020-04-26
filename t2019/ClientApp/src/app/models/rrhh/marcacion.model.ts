import { Novedades } from "./novedades/novedades.model";

export class Marcacion extends Novedades {
  public IdMarcacion: number;
  public Hora: string;
  public IdMarcacionTipo: number;
  public NmarcacionTipo: string;
  public IdMarcacionFuente: number;
  public NmarcacionFuente: string;
  public IdEquipo: number;
  public Nequipo: string;
  public IdEstado: number;
  public Nestado: string;
  public Latitud: string;
  public Longitud: string;
  public Foto: string;
  public Ok: boolean;
}

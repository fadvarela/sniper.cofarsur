import { ResponseHelper } from "../sistema/responseHelper";

export class Usuario extends ResponseHelper {
  public idUsuario: number;
  public nomUsuario: string;
  public pass: string;
  public idRol: any;
  public cuit: string;
}

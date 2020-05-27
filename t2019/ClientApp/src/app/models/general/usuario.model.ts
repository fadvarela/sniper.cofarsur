import { ResponseHelper } from "../sistema/responseHelper";


export class Usuario extends ResponseHelper {
  public IdUsuario: number;
  public NomUsuario: string;
  public Pass: string;
  public IdRol: any;
  public Cuit: string;
  public IdEmpresa: number;
}

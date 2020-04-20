export class Nomina {
  public idLegajo: number;
  public apellido: string;
  public nombre: string;
  public fechaNacimiento: Date;
  public cuil: number;

  constructor(idLegajo?: number, apellido?: string, nombre?: string, fechaNacimiento?: Date, cuil?: number) {
    this.idLegajo = idLegajo;
    this.apellido = apellido;
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.cuil = cuil;
  }
}

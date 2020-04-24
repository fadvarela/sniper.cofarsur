export class DateTimeEntity {
  public dia: number;
  public mes: number;
  public anio: number;
  public hora: number;
  public minuto: number;
  public segundo: number;

  getDateString() {
    return this.dia + '/' + this.mes + '/' + this.anio;
  }
}

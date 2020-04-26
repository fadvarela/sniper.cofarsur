import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private static mensaje: string;
  private static icono: string;
  private static contenido: string[];

  public static obtenerMensaje() {
    return SnackBarService.mensaje;
  }

  public static obtenerIcono() {
    return SnackBarService.icono;
  }

  public static obtenerContenido() {
    return SnackBarService.contenido;
  }

  constructor(
    private _snackBar: MatSnackBar) {

  }

  openSnackBar(tema: string, mensaje: string, tiempo: number) {
    this._snackBar.open(mensaje, '', {
      duration: tiempo,
      panelClass: [tema]
    });
  }

//   openSnackBar(message: string, ambito: TipoAlerta, duracion: number = null, contenido?: string[]) {
//     SnackBarService.mensaje = message;
//     SnackBarService.contenido = contenido;
//     switch (ambito.tipo) {
//       case 'fail': {
//         SnackBarService.icono = 'error';
//         break;
//       }
//       case 'warning': {
//         SnackBarService.icono = 'report_problem';
//         break;
//       }
//       case 'success': {
//         SnackBarService.icono = 'done';
//         break;
//       }
//       case 'info': {
//         SnackBarService.icono = 'info';
//         break;
//       }
//     }

//     this.snackBar.openFromComponent(CustomSnackBarComponent, {
//       duration: duracion,
//       panelClass: ['snackBar-' + ambito.tipo]
//     });
//   }

}

export interface TipoAlerta {
  tipo: 'fail' | 'warning' | 'success' | 'info';
}

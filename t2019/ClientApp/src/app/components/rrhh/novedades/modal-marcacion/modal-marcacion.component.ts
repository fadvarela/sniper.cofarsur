import { Marcacion } from './../../../../models/rrhh/marcacion.model';
import { Usuario } from 'src/app/models/general/usuario.model';
import { CmbEntity } from './../../../../models/general/cmbEntity.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-modal-marcacion',
  templateUrl: './modal-marcacion.component.html',
  styleUrls: ['./modal-marcacion.component.css']
})
export class ModalMarcacionComponent implements OnInit {
  displayedColumns: string[] = [
    'Hora',
    'Tipo Marcación',
    'Fuente Marcación',
    'Equipo',
    'Estado',
    'Incidencia',
    'Foto'
  ];
  dataSource = new MatTableDataSource<Marcacion>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  objeto: Novedades;
  titulo: string;
  novedad;
  lstJornadas: CmbEntity[] = [];
  lstIncidencias: CmbEntity[] = [];
  usuario: Usuario;
  disableButton = false;


  constructor(
    public dialogRef: MatDialogRef<ModalMarcacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private novedadesService: NovedadesService,
    private userValuesService: UserValuesService,
    private _snackBar: SnackBarService) {
    this.usuario = this.userValuesService.getUsuarioValues;
    this.objeto = data.obj;
    this.loadMarcaciones();
    this.titulo = this.data.titulo;

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadJornadasCmb();
    this.loadIncidenciasCmb();
  }

  loadJornadasCmb() {
    this.novedadesService.getListJornadas().subscribe((result: CmbEntity[]) => {
      this.lstJornadas = result;
    });
  }

  loadIncidenciasCmb() {
    let params = [];
    params.push(null);
    params.push(this.usuario.IdRol);
    params.push(1); // idEmpresa luego obtener el valido
    this.novedadesService.getListIncidencias(params).subscribe((result: CmbEntity[]) => {
      this.lstIncidencias = result;
    });
  }

  loadMarcaciones() {
    let params = [];
    params.push(this.objeto.Fecha.getDateString());
    params.push(this.objeto.IdLegajo);
    params.push(1); // idEmpresa luego obtener el valido
    this.novedadesService.getListMarcaciones(params).subscribe((result: Marcacion[]) => {
      this.dataSource.data = result;
    });
  }

  cerrarModal() { this.dialogRef.close(); }

  calcularMovimientos() {
    if (this.objeto.Marcaciones && this.objeto.Nincidencia) {
      return this.objeto.Marcaciones + this.objeto.Nincidencia;
    }
  }

  getSeleccionJornada(value) {
    this.objeto.IdJornada = value;
  }

  getSeleccionIncidencia(value) {
    this.objeto.IdIncidencia = value;
  }

  guardarJornada() {
    this.disableButton = true; // deshabilito en boton
    let params = [];
    params.push(this.objeto.IdJornada);

    this.novedadesService.guardarJornada(params).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Jornada guardada correctamente', 3000);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.disableButton = false;
  }

  guardarIncidencia() {
    this.disableButton = true; // deshabilito en boton
    let params = [];
    params.push(this.objeto.IdJornada);

    this.novedadesService.guardarIncidencia(params).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Incidencia guardada correctamente', 3000);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.disableButton = false;
  }

  guardarMarcacion() {
    this.disableButton = true; // deshabilito en boton
    let params = [];
    params.push(this.objeto.IdJornada);

    this.novedadesService.guardarMarcacion(params).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Marcación guardada correctamente', 3000);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.disableButton = false;
  }

}

export interface DialogData {
  titulo: string;
  obj: any;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



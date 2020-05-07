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
import { ParamEntity } from 'src/app/models/general/param.model';
import { SelectionModel } from '@angular/cdk/collections';

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
  isBtnGuardarJornada = false;
  setHorarioHabilitado = true;
  menuMarcacionOpened = false;
  isBtnAnularMarcacion = true;
  isBtnHabilitarMarcacion = true;
  timePickerValue: string;

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
    let paramEntity = new ParamEntity();
    paramEntity.IdEmpresa = 1;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.Fecha = this.objeto.Fecha;
    this.novedadesService.getListMarcaciones(paramEntity).subscribe((result: Marcacion[]) => {
      this.dataSource.data = result;
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  cerrarModal() { this.dialogRef.close(this.objeto.Fecha); }

  calcularMovimientos() {
    if (this.objeto.Marcaciones && this.objeto.Nincidencia) {
      return this.objeto.Marcaciones + this.objeto.Nincidencia;
    }
  }

  getSeleccionJornada(e) {
    this.objeto.IdJornada = e.value;
  }

  getSeleccionIncidencia(e) {
    this.objeto.IdIncidencia = e.value;
  }

  guardarJornada() {
    this.isBtnGuardarJornada = true; // deshabilito en boton

    let paramEntity = new ParamEntity();
    paramEntity.IdEmpresa = 1;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.Fecha = this.objeto.Fecha;
    paramEntity.IdJornada = this.objeto.IdJornada;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;


    this.novedadesService.guardarJornada(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Jornada guardada correctamente', 3000);
        this.cerrarModal();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.isBtnGuardarJornada = false;
  }

  guardarIncidencia() {
    this.isBtnGuardarJornada = true; // deshabilito en boton

    let paramEntity = new ParamEntity();
    paramEntity.IdEmpresa = 1;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.Fecha = this.objeto.Fecha;
    paramEntity.IdIncidencia = this.objeto.IdIncidencia;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.guardarIncidencia(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Incidencia guardada correctamente', 3000);
        this.cerrarModal();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.isBtnGuardarJornada = false;
  }

  anularMarcacion() {
    let marcacion = this.dataSource.data.find(x => x.Seleccionado);
    let paramEntity = new ParamEntity();
    paramEntity.IdEmpresa = 1;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.MarcacionEntity.Hora = '';
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.MarcacionEntity.IdMarcacionFuente = 2;
    paramEntity.MarcacionEntity.IdMarcacionTipo = 2;
    paramEntity.MarcacionEntity.IdEstado = 0;
    paramEntity.MarcacionEntity.IdIncidencia = null;
    paramEntity.MarcacionEntity.IdMarcacion = marcacion.IdMarcacion;

    this.novedadesService.anularMarcacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Marcación anulada correctamente', 3000);
        this.loadMarcaciones();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });

  }

  guardarMarcacion() {
    if (!this.timePickerValue) {
      this._snackBar.openSnackBar('snack-danger', 'Debe completar el campo de horario', 3000);
      return false;
    }

    let paramEntity = new ParamEntity();
    paramEntity.MarcacionEntity = new Marcacion();
    paramEntity.IdEmpresa = 1;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.FechaStr = this.objeto.Fecha.getDateString();
    paramEntity.MarcacionEntity.Hora = this.timePickerValue;
    paramEntity.MarcacionEntity.IdMarcacionFuente = 2;
    paramEntity.MarcacionEntity.IdMarcacionTipo = 2;
    paramEntity.MarcacionEntity.IdEstado = 1;
    paramEntity.MarcacionEntity.IdIncidencia = 0;
    paramEntity.MarcacionEntity.IdMarcacion = null;

    this.novedadesService.guardarMarcacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Marcación guardada correctamente', 3000);
        this.loadMarcaciones();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.isBtnGuardarJornada = false;
  }

  getRowData(marcacion: Marcacion) {
    this.dataSource.data.forEach(element => {
      if (element && element !== marcacion) {
        element.Seleccionado = false;
      }
    });
    marcacion.Seleccionado = !marcacion.Seleccionado;
    this.toggleAnularMarcacion(marcacion.Seleccionado);
  }

  toggleHorarioHabilitado() {
    this.setHorarioHabilitado = !this.setHorarioHabilitado;
  }

  toggleMarcacionMenuOpened() {
    this.menuMarcacionOpened = !this.menuMarcacionOpened;
  }

  toggleAnularMarcacion(habilitado) {
    this.isBtnAnularMarcacion = !habilitado;
    this.isBtnHabilitarMarcacion = !habilitado;
  }

  getTimePickerValue(value) {
    this.timePickerValue = value;
  }

}

export interface DialogData {
  titulo: string;
  obj: any;
}



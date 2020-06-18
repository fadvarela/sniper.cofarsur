import { ModalNominaComponent } from './../../modals/modal-nomina/modal-nomina.component';
import { ParamEntity } from './../../../models/general/param.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Marcacion } from 'src/app/models/rrhh/marcacion.model';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { CmbEntity } from 'src/app/models/general/cmbEntity.model';
import { Justificacion } from 'src/app/models/rrhh/justificacion.model';
import { Nomina } from 'src/app/models/rrhh/nomina.model';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { ModalConfirmacionComponent } from '../../modals/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.component.html',
  styleUrls: ['./justificaciones.component.css']
})
export class JustificacionesComponent implements OnInit {
  startDateValue;
  endDateValue;
  displayedColumns: string[] = [
    'Id Justificación',
    'Id Incidencia',
    'N Incidencia',
    'Desde',
    'Hasta',
    'Estado',
    'Observación',
    'Acción'
  ];
  dataSource = new MatTableDataSource<Justificacion>([]);
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  justificacion: Justificacion;
  listJustificacionesCmb: CmbEntity[] = [];
  fechaCalculadaLbl = '';
  justificacionesList: Justificacion[] = [];
  menuMarcacionOpened = false;
  dateInput: any = '';

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    private dialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.justificacion = new Justificacion();
    this.getIncidenciasCmb();
  }

  getStartDatePickerEmit(value?) {
    this.justificacion.FechaDesde = value;
    this.calculaFecha();
  }

  getEndDatePickerEmit(value?) {
    this.endDateValue = value;
  }

  getSeleccionIncidencia(e) {
    this.justificacion.IdIncidencia = e.value;
  }

  getIncidenciasCmb() {
    const paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdIncidencia = 0;

    this.novedadesService.getIncidenciasJustificaciones(paramEntity).subscribe((result: CmbEntity[]) => {
      this.listJustificacionesCmb = result;
    });
  }

  getJustificacionesGrilla(idLegajo) {
    const paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdLegajo = idLegajo;

    this.novedadesService.getJustificacionGrilla(paramEntity).subscribe((result: Justificacion[]) => {
      this.dataSource.data = result;
    });
  }

  postJustificacion() {
    const paramEntity = new ParamEntity<Justificacion>();
    paramEntity.GenericEntity = this.justificacion;
    paramEntity.GenericEntity.IdEstado = 0;
    paramEntity.GenericEntity.IdJustificacion = 0;
    paramEntity.IdLegajo = this.justificacion.IdLegajo;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.updJustificacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Justificación guardada correctamente', 3000);
        this.getJustificacionesGrilla(paramEntity.IdLegajo);
        this.justificacion = new Justificacion();
        this.dateInput = new Date();
        this.calculaFecha();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  anularJustificacion(row: Justificacion) {
    const paramEntity = new ParamEntity<Justificacion>();
    paramEntity.GenericEntity = this.justificacion;
    paramEntity.GenericEntity.IdJustificacion = row.IdJustificacion;
    paramEntity.GenericEntity.IdEstado = 0;
    paramEntity.GenericEntity.Dias = 0;
    paramEntity.IdLegajo = this.justificacion.IdLegajo;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.updJustificacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Justificación anulada correctamente', 3000);
        this.getJustificacionesGrilla(paramEntity.IdLegajo);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  openModalNomina() {
    const dialogRef = this.dialog.open(ModalNominaComponent, {
      width: '1000px',
      height: '550px',
      panelClass: 'modal-marcacion',
      autoFocus: false
    });
    dialogRef.beforeClosed().subscribe((result: Nomina) => {
      if (result) {
        Object.assign(this.justificacion, result);
        this.getJustificacionesGrilla(this.justificacion.IdLegajo);
      }
    });
  }

  calculaFecha() {
    if (this.justificacion.Dias > 0 && this.justificacion.Dias < 1000) {
      const result = new Date(this.justificacion.FechaDesde);
      result.setDate(result.getDate() + Number(this.justificacion.Dias));
      this.fechaCalculadaLbl = result.toISOString();
      return;
    }
    if (this.justificacion.Dias === 0) {
      this._snackBar.openSnackBar('snack-danger', 'Debe ingresar un número superior a 0 (cero)', 3000);
      return;
    }
    this.fechaCalculadaLbl = '';
    this.justificacion.Dias = null;
  }

  soloNumeros(e) {
    if (!(e.keyCode === 8
      || e.keyCode === 46
      || (e.keyCode >= 35 && e.keyCode <= 40)
      || (e.keyCode >= 48 && e.keyCode <= 57)
      || (e.keyCode >= 96 && e.keyCode <= 105)
      || (e.keyCode === 86 && e.ctrlKey === true)
      || e.keyCode === 111)) {
      e.preventDefault();
    }
  }

  toggleMenuOpened() {
    this.menuMarcacionOpened = !this.menuMarcacionOpened;
  }

  openModalConfirmacion() {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '500px',
      height: '120px',
      autoFocus: false,
      data: {
        titulo: '¿Desea guardar la justificación?'
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        this.postJustificacion();
      }
    });
  }

}

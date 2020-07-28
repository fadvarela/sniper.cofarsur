import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Justificacion } from 'src/app/models/rrhh/justificacion.model';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { CmbEntity } from 'src/app/models/general/cmbEntity.model';
import { ModalConfirmacionComponent } from '../../modals/modal-confirmacion/modal-confirmacion.component';
import { ModalNominaComponent } from '../../modals/modal-nomina/modal-nomina.component';
import { Nomina } from 'src/app/models/rrhh/nomina.model';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';
import { ParamEntity } from 'src/app/models/general/param.model';
import { Aviso } from 'src/app/models/rrhh/aviso.model';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
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
  aviso: Aviso;
  listIncidenciasCmb: CmbEntity[] = [];
  listPatologiasCmb: CmbEntity[] = [];
  fechaCalculadaLbl = '';
  justificacionesList: Justificacion[] = [];
  menuMarcacionOpened = false;
  dateInput: any = '';
  fechaPicker: Date;
  cmbPatologiaHabilitado: boolean;

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    private dialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.aviso = new Aviso();
    this.getIncidenciasCmb();
    this.getPatologiasCmb();
  }

  getStartDatePickerEmit(value?) {
    this.fechaPicker = value;
    this.calculaFecha(this.fechaPicker);
  }

  getEndDatePickerEmit(value?) {
    this.endDateValue = value;
  }

  getSeleccionIncidencia(e) {
    this.aviso.IdIncidencia = e.value;
    this.setMostrarCmbPatologia();
  }

  getSeleccionPatologia(e) {
    this.aviso.IdPatologia = e.value;
  }

  getPatologiasCmb() {
    let paramEntity = new ParamEntity<Justificacion>();
    paramEntity.GenericEntity = new Justificacion();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.aviso.IdLegajo;
    paramEntity.FechaDate = this.aviso.FechaDesde;
    paramEntity.IdPatologia = 0;

    this.novedadesService.getListPatologias(paramEntity).subscribe((result: CmbEntity[]) => {
      this.listPatologiasCmb = result;
    });
  }

  getIncidenciasCmb() {
    const paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdIncidencia = 0;

    this.novedadesService.getIncidenciasJustificaciones(paramEntity).subscribe((result: CmbEntity[]) => {
      this.listIncidenciasCmb = result;
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

  guardarAviso() {
    const paramEntity = new ParamEntity<Aviso>();
    this.aviso.FechaDesde = this.fechaPicker;
    paramEntity.GenericEntity = this.aviso;
    paramEntity.GenericEntity.IdEstado = 0;
    paramEntity.GenericEntity.IdAviso = 0;
    paramEntity.IdLegajo = this.aviso.IdLegajo;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.guardarAviso(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Justificación guardada correctamente', 3000);
        this.getJustificacionesGrilla(paramEntity.IdLegajo);
        this.limpiarObjeto();
        this.dateInput = this.dateInput = new Date();
        this.calculaFecha(this.fechaPicker);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  anularAviso(row: Aviso) {
    const paramEntity = new ParamEntity<Aviso>();
    paramEntity.GenericEntity = this.aviso;
    paramEntity.GenericEntity.IdAviso = row.IdAviso;
    paramEntity.GenericEntity.IdEstado = 0;
    paramEntity.GenericEntity.Dias = 0;
    paramEntity.IdLegajo = this.aviso.IdLegajo;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    // this.novedadesService.updJustificacion(paramEntity).subscribe((result: ResponseHelper) => {
    //   if (result.Ok) {
    //     this._snackBar.openSnackBar('snack-success', 'Justificación anulada correctamente', 3000);
    //     this.getJustificacionesGrilla(paramEntity.IdLegajo);
    //     this.limpiarObjeto();
    //   } else {
    //     this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
    //   }
    // }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  limpiarObjeto() {
    const nuevaJustificacion = new Justificacion();
    Object.assign(nuevaJustificacion, this.aviso);
    this.aviso = new Aviso();
    this.aviso.IdLegajo = nuevaJustificacion.IdLegajo;
    this.aviso.Nombre = nuevaJustificacion.Nombre;
    this.aviso.Apellido = nuevaJustificacion.Apellido;
    this.aviso.Seccion = nuevaJustificacion.Seccion;
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
        Object.assign(this.aviso, result);
        this.getJustificacionesGrilla(this.aviso.IdLegajo);
      }
    });
  }

  calculaFecha(fechaPicker?) {
    fechaPicker = (!fechaPicker) ? this.fechaPicker : fechaPicker;
    if (this.aviso.Dias > 0 && this.aviso.Dias < 1000) {
      const result = new Date(fechaPicker);
      result.setDate(result.getDate() + Number(this.aviso.Dias));
      this.fechaCalculadaLbl = result.toISOString();
      return;
    }
    if (this.aviso.Dias === 0) {
      this._snackBar.openSnackBar('snack-danger', 'Debe ingresar un número superior a 0 (cero)', 3000);
      return;
    }
    this.fechaCalculadaLbl = '';
    this.aviso.Dias = null;
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
        titulo: '¿Desea guardar el aviso?'
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        this.guardarAviso();
      }
    });
  }

  setMostrarCmbPatologia() {
    this.cmbPatologiaHabilitado = this.aviso.IdIncidencia && this.listIncidenciasCmb.find(x => x.Id === this.aviso.IdIncidencia).IdPreSet === 1;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CmbEntity } from 'src/app/models/general/cmbEntity.model';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { ModalNominaComponent } from '../../modals/modal-nomina/modal-nomina.component';
import { Nomina } from 'src/app/models/rrhh/nomina.model';
import { ModalConfirmacionComponent } from '../../modals/modal-confirmacion/modal-confirmacion.component';
import { Vacacion } from 'src/app/models/rrhh/vacacion.model';
import { ParamEntity } from 'src/app/models/general/param.model';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {
  menuMarcacionOpened = false;
  startDateValue;
  endDateValue;
  vacacionesListColumns: string[] = [
    'periodo',
    'fechaDesde',
    'fechaHasta',
    'dias',
    'estado',
    'fechaRegistro',
    'accion'
  ];

  saldosVacacionesListColumns: string[] = [
    'periodo',
    'diasDevengados',
    'diasPercibidos',
    'saldoPeriodo'
  ];
  vacacionesListDataSource = new MatTableDataSource<Vacacion>([]);
  saldosVacacionesListDataSource = new MatTableDataSource<Vacacion>([]);
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.vacacionesListDataSource.paginator = paginator;
    this.saldosVacacionesListDataSource.paginator = paginator;
  }
  listVacacionesCmb: CmbEntity[] = [];
  listPatologiasCmb: CmbEntity[] = [];
  fechaCalculadaRetorno = '';
  fechaCalculadaHasta = '';
  vacacionesList: Vacacion[] = [];
  dateInput: any = '';
  fechaPicker: Date;
  cmbPatologiaHabilitado: boolean;
  vacacionObj: Vacacion;

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    private fileService: FileService,
    private dialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.vacacionObj = new Vacacion();
  }

  toggleMenuOpened() {
    this.menuMarcacionOpened = !this.menuMarcacionOpened;
  }

  openModalNomina() {
    this.vacacionObj = new Vacacion();
    const dialogRef = this.dialog.open(ModalNominaComponent, {
      width: '1000px',
      height: '550px',
      panelClass: 'modal-marcacion',
      autoFocus: false
    });
    dialogRef.beforeClosed().subscribe((result: Nomina) => {
      if (result) {
        Object.assign(this.vacacionObj, result);
        this.getVacacionesList();
        this.getSaldosVacacionesList();
      }
    });
  }

  getSeleccionIncidencia(e) {
    this.vacacionObj.IdIncidencia = e.value;
    this.setMostrarCmbPatologia();
  }

  getSeleccionPatologia(e) {
    this.vacacionObj.IdPatologia = e.value;
  }

  setMostrarCmbPatologia() {
    this.cmbPatologiaHabilitado = this.vacacionObj.IdIncidencia && this.listVacacionesCmb.find(x => x.Id === this.vacacionObj.IdIncidencia).IdPreSet === 1;
  }

  getStartDatePickerEmit(value?) {
    this.fechaPicker = value;
    this.calculaFecha(this.fechaPicker);
  }

  calculaFecha(fechaPicker?) {
    fechaPicker = (!fechaPicker) ? this.fechaPicker : fechaPicker;
    if (this.vacacionObj.Dias > 0 && this.vacacionObj.Dias < 1000) {
      const result = new Date(fechaPicker);
      result.setDate(result.getDate() + Number(this.vacacionObj.Dias));
      this.fechaCalculadaRetorno = result.toISOString();
      result.setDate(result.getDate() - 1);
      this.fechaCalculadaHasta = result.toISOString();
      return;
    }
    if (this.vacacionObj.Dias === 0) {
      this._snackBar.openSnackBar('snack-danger', 'Debe ingresar un número superior a 0 (cero)', 3000);
      return;
    }
    this.fechaCalculadaRetorno = '';
    this.fechaCalculadaHasta = '';
    this.vacacionObj.Dias = null;
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

  openModalConfirmacion() {
    if (this.validarCampos()) {
      const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
        width: '500px',
        height: '120px',
        autoFocus: false,
        data: {
          titulo: '¿Desea guardar?'
        }
      });
      dialogRef.beforeClosed().subscribe((result) => {
        if (result) {
          this.guardarRegistro();
        }
      });
    }
  }

  private validarCampos() {
    if (!this.vacacionObj.Dias) {
      this._snackBar.openSnackBar('snack-danger', 'Ingrese cantidad de días', 3000);
      return false;
    }
    return true;
  }

  private getVacacionesList() {
    const paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdLegajo = this.vacacionObj.IdLegajo;

    this.novedadesService.getVacacionesList(paramEntity).subscribe((result: Vacacion[]) => {
      this.vacacionesListDataSource.data = result;
    });
  }

  private getSaldosVacacionesList() {
    const paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdLegajo = this.vacacionObj.IdLegajo;

    this.novedadesService.getSaldosVacacionesList(paramEntity).subscribe((result: Vacacion[]) => {
      this.saldosVacacionesListDataSource.data = result;
    });
  }

  guardarRegistro() {
    const paramEntity = new ParamEntity<Vacacion>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.GenericEntity = this.vacacionObj;
    paramEntity.GenericEntity.Anulacion = true;
    paramEntity.GenericEntity.IdEstado = 1;
    paramEntity.GenericEntity.IdJustificacion = 0;
    paramEntity.GenericEntity.FechaDesde = this.fechaPicker;
    paramEntity.GenericEntity.Observaciones = '';

    this.novedadesService.updVacacion(paramEntity).subscribe((resultGuardado: ResponseHelper) => {
      // VALIDO SI EL OK ES TRUE MUESTRO EL EXITO SINO ERROR
      this._snackBar.openSnackBar((resultGuardado.Ok) ? 'snack-success' : 'snack-danger', resultGuardado.Mensaje, 3000);
      if (resultGuardado.Ok) {
        // SI ES TRUE, USO TIMEOUT PARA QUE NO SE PISE CON EL MENSAJE ANTERIOR
        setTimeout(() => {
          this._snackBar.openSnackBar('snack-warning', 'Generando archivo. Por favor espere.');
        }, 2000);
        this.fileService.downloadPdf(resultGuardado).subscribe((resultDownload) => {
          if (resultDownload) {
            // SI SE DESCARGA CORRECTAMENTE LIMPIO TODO Y ACTUALIZO LOS DATOS
            this.getVacacionesList();
            this.getSaldosVacacionesList();
            this.limpiarObjeto();
            // USO EL TIMEOUT DE NUEVO PARA ELIMINAR EL MENSAJE ANTERIOR
            setTimeout(() => {
              this._snackBar.dismissSnackbar();
            }, 3000);

          } else {
            this._snackBar.openSnackBar('snack-danger', 'Hubo un error al intentar descargar el archivo', 3000);
          }
        }, (errorDescarga) => { this._snackBar.openSnackBar('snack-danger', errorDescarga, 5000); });
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  anularRegistro(row: Vacacion, tipo: string) {
    const paramEntity = new ParamEntity<Vacacion>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.GenericEntity.IdJustificacion = row.IdJustificacion;
    paramEntity.GenericEntity.Anulacion = true;
    paramEntity.GenericEntity.IdEstado = 0;

    this.novedadesService.updVacacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Registro anulada correctamente', 3000);
        (tipo === 'vacaciones') ? this.getVacacionesList() : this.getSaldosVacacionesList();
        this.limpiarObjeto();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  limpiarObjeto() {
    const nuevaVacacion = new Vacacion();
    Object.assign(nuevaVacacion, this.vacacionObj);
    this.vacacionObj = new Vacacion();
    this.vacacionObj.IdLegajo = nuevaVacacion.IdLegajo;
    this.vacacionObj.Nombre = nuevaVacacion.Nombre;
    this.vacacionObj.Apellido = nuevaVacacion.Apellido;
    this.vacacionObj.Seccion = nuevaVacacion.Seccion;
    this.dateInput = this.dateInput = new Date();
    this.calculaFecha(this.fechaPicker);
  }

}

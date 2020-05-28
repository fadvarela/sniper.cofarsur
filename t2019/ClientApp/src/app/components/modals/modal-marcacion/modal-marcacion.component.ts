import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Marcacion } from 'src/app/models/rrhh/marcacion.model';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { CmbEntity } from 'src/app/models/general/cmbEntity.model';
import { Usuario } from 'src/app/models/general/usuario.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { ParamEntity } from 'src/app/models/general/param.model';
import { ResponseHelper } from 'src/app/models/sistema/responseHelper';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';

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
  isBtnGuardarMarcacion = false;
  isBtnGuardarIncidencia = false;
  setHorarioHabilitado = true;
  menuMarcacionOpened = false;
  isBtnAnularMarcacion = true;
  isBtnHabilitarMarcacion = true;
  timePickerValue: string;

  constructor(
    public dialogRef: MatDialogRef<ModalMarcacionComponent>,
    public dialog: MatDialog,
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
    params.push(this.userValuesService.getUsuarioValues.IdEmpresa); // idEmpresa luego obtener el valido

    this.novedadesService.getListIncidencias(params).subscribe((result: CmbEntity[]) => {
      this.lstIncidencias = result;
    });
  }

  loadMarcaciones() {
    let paramEntity = new ParamEntity<object>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.FechaDate = this.objeto.FechaDate;
    this.novedadesService.getListMarcaciones(paramEntity).subscribe((result: Marcacion[]) => {
      this.dataSource.data = result;
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

  cerrarModal() {
    this.dialogRef.close(this.objeto.FechaDate);
  }

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

    let paramEntity = new ParamEntity<object>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.FechaDate = this.objeto.FechaDate;
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
    this.isBtnGuardarIncidencia = true; // deshabilito en boton

    let paramEntity = new ParamEntity<object>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.FechaDate = this.objeto.FechaDate;
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
    this.isBtnGuardarIncidencia = false;
  }

  anularMarcacion() {
    let marcacion = this.dataSource.data.find(x => x.Seleccionado);
    let paramEntity = new ParamEntity<Marcacion>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.GenericEntity.Hora = '';
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.GenericEntity.IdMarcacionFuente = 2;
    paramEntity.GenericEntity.IdMarcacionTipo = 2;
    paramEntity.GenericEntity.IdEstado = 0;
    paramEntity.GenericEntity.IdIncidencia = 0;
    paramEntity.GenericEntity.IdMarcacion = marcacion.IdMarcacion;


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
    this.isBtnGuardarMarcacion = true; // deshabilito en boton
    if (!this.timePickerValue) {
      this._snackBar.openSnackBar('snack-danger', 'Debe completar el campo de horario', 3000);
      return false;
    }

    let paramEntity = new ParamEntity<Marcacion>();
    paramEntity.GenericEntity = new Marcacion();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = this.objeto.IdLegajo;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.FechaDate = this.objeto.FechaDate;
    paramEntity.GenericEntity.Hora = this.timePickerValue;
    paramEntity.GenericEntity.IdMarcacionFuente = 2;
    paramEntity.GenericEntity.IdMarcacionTipo = 2;
    paramEntity.GenericEntity.IdEstado = 1;
    paramEntity.GenericEntity.IdIncidencia = 0;
    paramEntity.GenericEntity.IdMarcacion = null;

    this.novedadesService.guardarMarcacion(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Marcación guardada correctamente', 3000);
        this.loadMarcaciones();
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
    this.isBtnGuardarMarcacion = false;
    this.setHorarioHabilitado = false;
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

  openModalData(tipo) {
    let titulo = '¿Desea guardar la ';
    switch (tipo) {
      case 'jornada':
        titulo += 'jornada?';
        break;
      case 'marcacion':
        titulo += 'marcación?';
        break;
      case 'incidencia':
        titulo += 'incidencia?';
        break;
      default:
        break;
    }

    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '500px',
      height: '120px',
      autoFocus: false,
      data: {
        titulo: titulo
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        switch (tipo) {
          case 'jornada':
            this.guardarJornada();
            break;
          case 'marcacion':
            this.guardarMarcacion();
            break;
          case 'incidencia':
            this.guardarIncidencia();
            break;
          default:
            break;
        }
      }
    });
  }

}

export interface DialogData {
  titulo: string;
  obj: any;
}

import { DateTimeEntity } from './../../../../models/sistema/dateTimeEntity';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource, MatDialog, DateAdapter, MAT_DATE_FORMATS, MatMenuTrigger } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ModalMarcacionComponent } from 'src/app/components/rrhh/novedades/modal-marcacion/modal-marcacion.component';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/models/sistema/dateHelper';
import * as _moment from 'moment';
import { DatepickerComponent } from 'src/app/components/utils/datepicker/datepicker.component';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { ParamEntity } from 'src/app/models/general/param.model';


@Component({
  selector: 'app-parte-diario',
  templateUrl: './parte-diario.component.html',
  styleUrls: ['./parte-diario.component.css']
})
export class ParteDiarioComponent implements OnInit {


  displayedColumns: string[] = [
    'SECCION',
    'ID_LEGAJO',
    'APELLIDO',
    'NOMBRE',
    'N_JORNADA',
    'N_INCIDENCIA',
    'MARCACIONES',
    'H_TEORICAS',
    'H_TRABAJADAS',
    'I_IMPARES',
    'I_SIN_INCIDENCIAS',
    'H_ADICIONALES',
    'H_AUSENCIA'
  ];
  dataSource = new MatTableDataSource<Novedades>([]);
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild('dtpMenuTrigger', { static: true }) datepickerMenuTrigger: MatMenuTrigger;

  @Output() ParteDiario_WaitHome_prm = new EventEmitter();
  @Output() eventEmitter = new EventEmitter();
  datePickerComponent = new DatepickerComponent();
  setDatePickerEmit = new DateTimeEntity();
  txtParam: any;
  isDatePickerMenuOpened = false;
  mostrarProgressBar: boolean;
  fechaLabel: any;

  suscribe: any;

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    public dialog: MatDialog,
    private _snackBar: SnackBarService
  ) {
  }

  ngOnInit() {
    this.setDatePickerEmit = this.datePickerComponent.convertirDateEntity(new Date());
    this.getNovedades(this.setDatePickerEmit);
  }

  // recibe por param el valor del Datepicker (enviado desde otra funcion)
  // si el menu flotante (donde esta el datepicker) esta abierto (valor)
  // lo cierro luego de seleccionar una fecha
  getNovedades(valor: DateTimeEntity) {
    this.mostrarProgressBar = true;
    if (this.isDatePickerMenuOpened) {
      this.datepickerMenuTrigger.closeMenu();
    }
    this.fechaLabel = valor.getDateString();
    let paramEntity = new ParamEntity();
    paramEntity.IdEmpresa = 1;
    paramEntity.Fecha = valor;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.getNovedades(paramEntity).subscribe((result: Novedades[]) => {
      if (result) {
        this.dataSource.data = [...result];
      }
      this.mostrarProgressBar = false;
    }, (error) => { this._snackBar.openSnackBar('snack-danger', 'Backend error: ' + error.error, 5000); });
  }


  toggleDatepickerMenuOpened() {
    this.isDatePickerMenuOpened = !this.isDatePickerMenuOpened;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // recibo el valor que viene del Datepicker (HTML)
  // y lo capturo en mi variable
  // si necesito llamar a la BD, seteo el segundo parametro
  // en TRUE
  getDateFromPickerEmit(value?, callDB?) {
    this.setDatePickerEmit = value;

    if (callDB) {
      this.getNovedades(this.setDatePickerEmit);
    }
  }


  openModalData(row: Novedades) {

    row.Fecha = this.setDatePickerEmit;
    const dialogRef = this.dialog.open(ModalMarcacionComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'modal-marcacion',
      data: {
        titulo: 'Novedades',
        obj: row,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getNovedades(result);
      }

    });
  }
}

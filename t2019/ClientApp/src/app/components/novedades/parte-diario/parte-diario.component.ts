import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { ModalMarcacionComponent } from '../../modals/modal-marcacion/modal-marcacion.component';
import { ParamEntity } from 'src/app/models/general/param.model';
import { DatepickerComponent } from '../../utils/datepicker/datepicker.component';
import { LoadingInterceptorService } from 'src/app/services/utils/loader-interceptor.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { MatDialog, MatMenuTrigger, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';

@Component({
  selector: 'app-parte-diario',
  templateUrl: './parte-diario.component.html',
  styleUrls: ['./parte-diario.component.css']
})
export class ParteDiarioComponent implements OnInit {

  titulo = 'Parte diario';

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
  datePickerComponent: DatepickerComponent;
  setDatePickerEmit: any;
  txtParam: any;
  isDatePickerMenuOpened = false;
  fechaLabel: any;
  suscribe: any;
  initialDate: any;

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    public dialog: MatDialog,
    private _snackBar: SnackBarService,
    private loadingInterceptorService: LoadingInterceptorService
  ) {
    this.datePickerComponent = new DatepickerComponent();
  }

  ngOnInit() {
    this.setDatePickerEmit = new Date().toISOString();
    this.getNovedades(this.setDatePickerEmit);
  }

  // recibe por param el valor del Datepicker (enviado desde otra funcion)
  // si el menu flotante (donde esta el datepicker) esta abierto (valor)
  // lo cierro luego de seleccionar una fecha
  getNovedades(valor: Date) {
    // this.mostrarProgressBar = true;
    if (this.isDatePickerMenuOpened) {
      this.datepickerMenuTrigger.closeMenu();
    }
    this.fechaLabel = valor;
    let paramEntity = new ParamEntity<any>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.FechaDate = valor;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.getNovedades(paramEntity).subscribe((result: Novedades[]) => {
      if (result) {
        this.dataSource.data = [...result];
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', 'Backend error: ' + error.error, 5000); });
  }


  toggleDatepickerMenuOpened() {
    this.isDatePickerMenuOpened = !this.isDatePickerMenuOpened;
  }

  // recibo el valor que viene del Datepicker (HTML)
  // y lo capturo en mi variable
  // si necesito llamar a la BD, seteo el segundo parametro
  // en TRUE
  getDateFromPickerEmit(value?, callDB?) {
    this.setDatePickerEmit = value;

    if (callDB) {
      this.getNovedades(value);
    }
  }

  openModalData(row: Novedades) {
    row.FechaDate = this.setDatePickerEmit;
    const dialogRef = this.dialog.open(ModalMarcacionComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'modal-marcacion',
      autoFocus: false,
      data: {
        titulo: 'Novedades',
        obj: row,
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        this.getNovedades(result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

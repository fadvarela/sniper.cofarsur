import { JornadaHabitual } from './../../../models/rrhh/novedades/jornada-habitual.model';
import { ModalJornadasHabitualesComponent } from './../../modals/modal-jornadas-habituales/modal-jornadas-habituales.component';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { MatDialog, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { LoadingInterceptorService } from 'src/app/services/utils/loader-interceptor.service';
import { ParamEntity } from 'src/app/models/general/param.model';

@Component({
  selector: 'app-jornadas-habituales',
  templateUrl: './jornadas-habituales.component.html',
  styleUrls: ['./jornadas-habituales.component.css']
})
export class JornadasHabitualesComponent implements OnInit {
  dataSource = new MatTableDataSource<JornadaHabitual>([]);
  displayedColumns: string[] = [
    'Id Legajo',
    'Sección',
    'Nombre',
    'Apellido',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
    'Hs Semanales'
  ];

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    public dialog: MatDialog,
    private _snackBar: SnackBarService,
    private loadingInterceptorService: LoadingInterceptorService
  ) {
  }

  ngOnInit() {
    this.getJornadasHabituales();
  }

  getJornadasHabituales() {
    const paramEntity = new ParamEntity<object>();
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdLegajo = 0;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;

    this.novedadesService.getListJornadasHabituales(paramEntity).subscribe((result: JornadaHabitual[]) => {
      if (result) {
        this.dataSource.data = [...result];
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', 'Backend error: ' + error.error, 5000); });
  }

  openModalData(row: JornadaHabitual) {
    const dialogRef = this.dialog.open(ModalJornadasHabitualesComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'modal-marcacion',
      autoFocus: false,
      data: {
        obj: row,
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result) {
        this.getJornadasHabituales();
      }
    });
  }
}

export interface DialogData {
  titulo: string;
  obj: any;
}

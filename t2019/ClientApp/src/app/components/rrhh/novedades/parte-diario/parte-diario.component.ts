import { DateTimeEntity } from './../../../../models/sistema/dateTimeEntity';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource, MatPaginator, MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ModalMarcacionComponent } from 'src/app/components/rrhh/novedades/modal-marcacion/modal-marcacion.component';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/models/sistema/dateHelper';
import * as _moment from 'moment';



@Component({
  selector: 'app-parte-diario',
  templateUrl: './parte-diario.component.html',
  styleUrls: ['./parte-diario.component.css']
})
export class ParteDiarioComponent implements OnInit {

  displayedColumns: string[] = [
    'ID_LEGAJO',
    'APELLIDO',
    'NOMBRE',
    'ID_JORNADA',
    'N_JORNADA',
    'ID_INCIDENCIA',
    'N_INCIDENCIA',
    'MARCACIONES',
    'H_TEORICAS',
    'H_TRABAJADAS',
    'I_IMPARES',
    'I_SIN_INCIDENCIAS',
    'H_ADICIONALES',
    'H_AUSENCIA'
  ];

  @Output() ParteDiario_WaitHome_prm = new EventEmitter();
  dataSource = new MatTableDataSource<Novedades>([]); // primero se declara un dataSource para la tabla
  txtParam: any;
  datePicker = new Date(); // = moment(new Date()).format('DD-MM-YYYY');
  hoyDate = new Date();
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private novedadesService: NovedadesService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getNovedades(false);
  }

  getNovedades(convertir: boolean) {
    if (convertir) {
      this.datePicker = new Date(this.datePicker);
    }

    let dateEntity = new DateTimeEntity();
    dateEntity.dia = this.datePicker.getDate();
    dateEntity.mes = this.datePicker.getMonth() + 1;
    dateEntity.anio = this.datePicker.getFullYear();

    console.log(dateEntity);
    // this.datePicker = this.datePipe.transform(this.datePicker, 'dd-MM-yyyy', 'es-AR');
    this.ParteDiario_WaitHome_void(1);
    this.novedadesService.getnovedades(dateEntity).subscribe((result: Novedades[]) => {
      this.dataSource.data = result;
    });
    this.ParteDiario_WaitHome_void(0);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ParteDiario_WaitHome_void(wait: number) {
    this.ParteDiario_WaitHome_prm.emit(wait);
  }


  openModalData(row?) {

    const dialogRef = this.dialog.open(ModalMarcacionComponent, {
      width: '1000px',
      height: '350px',
      panelClass: 'no-padding',
      data: {
        titulo: 'Novedades',
        obj: row,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

import { DateTimeEntity } from './../../../../models/sistema/dateTimeEntity';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource, MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
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
  dataSource: MatTableDataSource<Novedades>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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

  txtParam: any;
  datePicker = new Date(); // = moment(new Date()).format('DD-MM-YYYY');
  hoyDate = new Date();


  constructor(
    private novedadesService: NovedadesService,
    public dialog: MatDialog) {
      this.dataSource = new MatTableDataSource();
    this.getNovedades(false);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getNovedades(convertir: boolean) {
    if (convertir) {
      this.datePicker = new Date(this.datePicker);
    }

    let dateEntity = new DateTimeEntity();
    dateEntity.dia = this.datePicker.getDate();
    dateEntity.mes = this.datePicker.getMonth() + 1;
    dateEntity.anio = this.datePicker.getFullYear();
    // this.datePicker = this.datePipe.transform(this.datePicker, 'dd-MM-yyyy', 'es-AR');
    this.ParteDiario_WaitHome_void(1);
    this.novedadesService.getnovedades(dateEntity).subscribe((result: Novedades[]) => {
      this.dataSource.data = result;
      // this.dataSource.data = result;
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
    row.fecha = this.datePicker;

    const dialogRef = this.dialog.open(ModalMarcacionComponent, {
      width: '1000px',
      height: '500px',
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

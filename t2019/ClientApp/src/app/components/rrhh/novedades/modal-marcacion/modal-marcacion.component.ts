import { CmbEntity } from './../../../../models/general/cmbEntity.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-modal-marcacion',
  templateUrl: './modal-marcacion.component.html',
  styleUrls: ['./modal-marcacion.component.css']
})
export class ModalMarcacionComponent implements OnInit {
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  objeto: Novedades;
  titulo: string;
  novedad;
  lstJornadas: CmbEntity[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];



  constructor(
    public dialogRef: MatDialogRef<ModalMarcacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private novedadesService: NovedadesService
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.titulo = this.data.titulo;
    this.objeto = data.obj;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadJornadasCmb();
  }

  loadJornadasCmb() {
    this.novedadesService.getListJornadas().subscribe((result: CmbEntity[]) => {
      this.lstJornadas = result;
    });
  }

  cerrarModal() { this.dialogRef.close(); }

  calcularMovimientos() {
    if (this.objeto.Marcaciones && this.objeto.Nincidencia) {
      return this.objeto.Marcaciones + this.objeto.Nincidencia;
    }
  }

  getSeleccionCmb(value) {
    this.objeto.IdJornada = value;
  }

}

export interface DialogData {
  titulo: string;
  obj: any;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



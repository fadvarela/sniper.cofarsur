import { Component, Inject, OnInit } from '@angular/core';
import { Novedades } from 'src/app/models/rrhh/novedades/novedades.model';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';


import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-marcacion',
  templateUrl: './modal-marcacion.component.html',
  styleUrls: ['./modal-marcacion.component.css']
})
export class ModalMarcacionComponent implements OnInit {

  obj;
  titulo: string;
  novedad;

  constructor(
    public dialogRef: MatDialogRef<ModalMarcacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.titulo = this.data.titulo;
    this.obj = data.obj;
    console.log(this.obj)
  }

  ngOnInit() { }

  cerrarModal() { this.dialogRef.close(); }

}

export interface DialogData {
  titulo: string;
  obj: any;
}

import { NovedadesService } from './../../../services/rrhh/novedades/novedades.service';
import { Idle } from 'idlejs/dist';
import { ParamEntity } from './../../../models/general/param.model';
import { UserValuesService } from './../../../services/utils/user-values.service';
import { Nomina } from './../../../models/rrhh/nomina.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Marcacion } from 'src/app/models/rrhh/marcacion.model';

@Component({
  selector: 'app-modal-nomina',
  templateUrl: './modal-nomina.component.html',
  styleUrls: ['./modal-nomina.component.css']
})
export class ModalNominaComponent implements OnInit {
  displayedColumns: string[] = [
    'IdLegajo',
    'Apellido',
    'Nombre',
    'Seccion',
    'Cuil',
    'Fingreso',
    'Fegreso',
    'Accion'
  ];
  dataSource = new MatTableDataSource<Nomina>([]);
  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  nominaList: Nomina[] = [];

  constructor(
    private userValuesService: UserValuesService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalNominaComponent>,
    private novedadesService: NovedadesService
  ) { }

  ngOnInit() {
    this.getNominaGrilla();
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  filtrarGrilla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getNominaGrilla() {
    const paramEntity = new ParamEntity();
    paramEntity.IdLegajo = 0;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.Tipo = 'ACTIVA';

    this.novedadesService.getNominaGrilla(paramEntity).subscribe((result: Nomina[]) => {
      this.dataSource.data = result;
    });
  }

  getRowData(marcacion: Nomina) {
    this.dataSource.data.forEach(element => {
      if (element && element !== marcacion) {
        element.Seleccionado = false;
      }
    });
    marcacion.Seleccionado = !marcacion.Seleccionado;
  }

  agregarPersona(marcacion: Nomina) {
    this.dialogRef.close(marcacion);
  }


}

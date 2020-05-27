import { ParamEntity } from 'src/app/models/general/param.model';
import { ResponseHelper } from './../../../models/sistema/responseHelper';
import { JornadaHabitual } from './../../../models/rrhh/novedades/jornada-habitual.model';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../modal-marcacion/modal-marcacion.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { NovedadesService } from 'src/app/services/rrhh/novedades/novedades.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { CmbEntity } from 'src/app/models/general/cmbEntity.model';

@Component({
  selector: 'app-modal-jornadas-habituales',
  templateUrl: './modal-jornadas-habituales.component.html',
  styleUrls: ['./modal-jornadas-habituales.component.css']
})
export class ModalJornadasHabitualesComponent implements OnInit {
  diasList = [
    { id: 0, Header: 'Lunes' },
    { id: 0, Header: 'Martes' },
    { id: 0, Header: 'Miércoles' },
    { id: 0, Header: 'Jueves' },
    { id: 0, Header: 'Viernes' },
    { id: 0, Header: 'Sábado' },
    { id: 0, Header: 'Domingo' }
  ];
  objeto = new JornadaHabitual();
  lstJornadas: CmbEntity[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalJornadasHabitualesComponent>,
    private userValuesService: UserValuesService,
    private novedadesService: NovedadesService,
    public dialog: MatDialog,
    private _snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.objeto = data.obj;
  }

  ngOnInit() {
    this.loadJornadasCmb();
    this.getIdObjeto();
  }

  getIdObjeto() {
    const idList = [];
    idList.push(this.objeto.IdJlunes);
    idList.push(this.objeto.IdJmartes);
    idList.push(this.objeto.IdJmiercoles);
    idList.push(this.objeto.IdJjueves);
    idList.push(this.objeto.IdJviernes);
    idList.push(this.objeto.IdJsabado);
    idList.push(this.objeto.IdJdomingo);

    for (let index = 0; index < this.diasList.length; index++) {
      this.diasList[index].id = idList[index];
    }
  }

  cerrarModal() {
    this.dialogRef.close(true);
  }

  loadJornadasCmb() {
    this.novedadesService.getListJornadas().subscribe((result: CmbEntity[]) => {
      this.lstJornadas = result;
    });
  }

  guardarJornada() {
    const paramEntity = new ParamEntity();
    this.objeto.IdJlunes = this.diasList[0].id;
    this.objeto.IdJmartes = this.diasList[1].id;
    this.objeto.IdJmiercoles = this.diasList[2].id;
    this.objeto.IdJjueves = this.diasList[3].id;
    this.objeto.IdJviernes = this.diasList[4].id;
    this.objeto.IdJsabado = this.diasList[5].id;
    this.objeto.IdJdomingo = this.diasList[6].id;
    paramEntity.GenericEntity = this.objeto;
    paramEntity.IdEmpresa = this.userValuesService.getUsuarioValues.IdEmpresa;
    paramEntity.IdUsuario = this.userValuesService.getUsuarioValues.IdUsuario;
    paramEntity.IdLegajo = this.objeto.IdLegajo;

    this.novedadesService.guardarJornadaHabitual(paramEntity).subscribe((result: ResponseHelper) => {
      if (result.Ok) {
        this._snackBar.openSnackBar('snack-success', 'Jornada guardada correctamente', 3000);
      } else {
        this._snackBar.openSnackBar('snack-danger', result.Mensaje, 3000);
      }
    }, (error) => { this._snackBar.openSnackBar('snack-danger', error.error, 3000); });
  }

}

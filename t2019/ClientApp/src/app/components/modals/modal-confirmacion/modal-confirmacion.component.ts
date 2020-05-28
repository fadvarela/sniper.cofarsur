import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {
  objeto: any;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    public dialog: MatDialog,
    private _snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.objeto = this.data;
  }

  ngOnInit() {
  }

  cerrarModal(estado) {
    this.dialogRef.close(estado);
  }

}

export interface DialogData {
  titulo: string;
  // obj: any;
}

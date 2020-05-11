import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/general/usuario.model';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-ingreso',
  templateUrl: './login-ingreso.component.html',
  styleUrls: ['./login-ingreso.component.css']
})
export class LoginIngresoComponent implements OnInit, AfterViewInit {
  nomUsuarioFormControl = new FormControl('');
  passFormControl = new FormControl('');
  usuario = new Usuario();
  mostrarProgressBar = false;

  /*--------Styles---------*/
  matCardLogin = 'mat-card-login d-none';

  @Output() setRecuperaCuenta = new EventEmitter();
  @Output() toggleSpinnerEmit = new EventEmitter();

  constructor(
    private userValuesService: UserValuesService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.matCardLogin = '';
    }, 1200);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggleSpinnerEmit.emit(false);
    }, 500);
  }

  loginSubmit() {
    this.mostrarProgressBar = this.validarForm();
    this.userValuesService.setLogin(this.usuario.NomUsuario, this.usuario.Pass).then((result) => {
      if (result) {
        this._snackBar.openSnackBar('snack-success', 'Bienvenido ' + this.userValuesService.getUsuarioValues.NomUsuario + '!', 4000);
      } else {
        this._snackBar.openSnackBar('snack-danger', this.userValuesService.getUsuarioValues.Mensaje, 5000);
      }
      this.mostrarProgressBar = false;
    });
  }

  validarForm() {
    if (!this.usuario.NomUsuario) {
      this._snackBar.openSnackBar('snack-danger', 'Debe ingresar un nombre de usuario', 4000);
      return false;
    }
    if (!this.usuario.Pass) {
      this._snackBar.openSnackBar('snack-danger', 'Debe ingresar una contraseña', 4000);
      return false;
    }
    return true;
  }

  setRecuperarCuenta() {
    this.matCardLogin = 'd-none';
    this.setRecuperaCuenta.emit();
  }

}

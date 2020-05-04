import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/general/usuario.model';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  bgImage = '../../../assets/images/bg/recursoHumano.jpg';
  nomUsuarioFormControl = new FormControl('');
  passFormControl = new FormControl('');
  usuario: Usuario = new Usuario();

  username: string;
  password: string;

  valid: boolean;
  Login_Wait_prm: number;
  mostrarProgressBar = false;

  /*--------Styles---------*/
  sideNavWidth = '';
  matCardLogin = 'mat-card-login';

  @Input() public set Login_ReciveLoginId_Void(IdAccion: number) {
    this.Login_Recibe_LoginAccion(IdAccion);
  }
  @Output() LoginAccion_Prm = new EventEmitter();
  @Output() Login_IdRol_Prm = new EventEmitter();
  @Output() autenticadoEmit = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
    private userValuesService: UserValuesService,
    private _snackBar: SnackBarService,
    private router: Router) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.sideNavWidth = '18%';
      this.matCardLogin = '';
    }, 1000);
  }

  ngAfterViewInit() {

  }

  loginSubmit() {
    this.mostrarProgressBar = true;

    if (this.validarForm()) {
      this.userValuesService.setLogin(this.usuario.NomUsuario, this.usuario.Pass).then((result) => {
        if (result) {
          this._snackBar.openSnackBar('snack-success', 'Bienvenido ' + this.userValuesService.getUsuarioValues.NomUsuario + '!', 4000);
        } else {
          this._snackBar.openSnackBar('snack-danger', this.userValuesService.getUsuarioValues.Mensaje, 4000);
        }
        this.mostrarProgressBar = true;
      });
    }
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


  Login_Recibe_LoginAccion(idAccion: number) {
    if (idAccion == 1) {
      document.getElementById("mySidenav").style.width = "250px";
    }
    else {
      document.getElementById("mySidenav").style.width = "0";
    }
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    this.send_LoginAccion(0);
  }


  send_LoginAccion(idAccion: number) {
    this.LoginAccion_Prm.emit(idAccion);
  }


  setEmitIdRol(IdRol: number) {
    this.Login_IdRol_Prm.emit(IdRol);
  }

  setAutenticado() {
    this.autenticadoEmit.emit(true);
  }


}

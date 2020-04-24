import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MatTableDataSource, MatSnackBar, MatSidenav } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/general/usuario.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nomUsuarioFormControl = new FormControl('');
  passFormControl = new FormControl('');
  usuario: Usuario = new Usuario();

  username: string;
  password: string;

  valid: boolean;
  Login_Wait_prm: number;
  mostrarProgressBar = false;

  @Input() public set Login_ReciveLoginId_Void(IdAccion: number) {
    this.Login_Recibe_LoginAccion(IdAccion);
  }
  @Output() LoginAccion_Prm = new EventEmitter();
  @Output() Login_IdRol_Prm = new EventEmitter();

  constructor(private _sanitizer: DomSanitizer, private loginService: LoginService,
    private _snackBar: MatSnackBar, private router: Router) {

  }


  ngOnInit() {

  }


  loginSubmit() {
    let mensaje = '';
    this.mostrarProgressBar = true;

    if (this.validarForm()) {
      this.loginService.ValidarUsuario(this.usuario.NomUsuario, this.usuario.Pass).subscribe((result: Usuario[]) => {
        result.forEach(e => {
          if (e.Ok) {
            this.get_IdRol(e.IdRol);
            this.closeNav();
            this.openSnackBar('snack-success', 'Bienvenido ' + e.NomUsuario + '!', 4000);
          } else {
            this.openSnackBar('snack-danger', e.Mensaje, 4000);
          }
        });
      });
    }
    this.mostrarProgressBar = false;
  }

  validarForm() {
    if (!this.usuario.NomUsuario) {
      this.openSnackBar('snack-danger', 'Debe ingresar un nombre de usuario', 4000);
      return false;
    }
    if (!this.usuario.Pass) {
      this.openSnackBar('snack-danger', 'Debe ingresar una contraseña', 4000);
      return false;
    }
    return true;
  }

  openSnackBar(tema: string, mensaje: string, tiempo: number) {
    this._snackBar.open(mensaje, '', {
      duration: tiempo,
      panelClass: [tema]
    });
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


  get_IdRol(IdRol: number) {
    this.Login_IdRol_Prm.emit(IdRol);
  }


















}


    //if (!this.CUIT.value) {
    //  mostrar = false;
    //  this.CUIT.setValidators([Validators.required]);
    //  mensaje = 'Debe ingresar un nombre de usuario';
    //  this.openSnackBar('snack-danger', mensaje, 4000);
    //}

    //if (!this.Usuario.value) {
    //  mostrar = false;
    //  this.Usuario.setValidators([Validators.required]);
    //  mensaje = 'Debe ingresar un nombre de usuario';
    //  this.openSnackBar('snack-danger', mensaje, 4000);
    //}
    //if (!this.Pass.value) {
    //  mostrar = false;
    //  this.Pass.setValidators([Validators.required]);
    //  mensaje = 'Debe ingresar una contraseña valida';
    //  this.openSnackBar('snack-danger', mensaje, 4000);
    //}




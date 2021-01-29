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
  bgImage = '../../../assets/images/Cofarsur/Cofarsur_BGLogin.png'; //'../../../assets/images/Cofarsur/Cofarsur_BGLogin.png'; //'../../../assets/images/bg/loginBG.jpg';
  logoSniper = '../../../assets/images/SBOT/SBOT_LOGO.png';

  username: string;
  password: string;

  valid: boolean;
  Login_Wait_prm: number;

  sideNavWidth = '';
  recuperaCuenta: boolean;
  showLoaderLogin = false;

  @Input() public set Login_ReciveLoginId_Void(IdAccion: number) {
    this.Login_Recibe_LoginAccion(IdAccion);
  }
  @Output() LoginAccion_Prm = new EventEmitter();
  @Output() Login_IdRol_Prm = new EventEmitter();
  @Output() autenticadoEmit = new EventEmitter();

  constructor(
    private userValuesService: UserValuesService,
    private _snackBar: SnackBarService,
    private router: Router) {

  }

  ngOnInit() {
    this.showHideNavbar(1000);
    console.log('Init session log: ' + new Date());
  }

  ngAfterViewInit() {
    this.recuperaCuenta = false;
  }

  switchBoxLogin() {
    this.showLoaderLogin = true;
    this.recuperaCuenta = !this.recuperaCuenta;
  }

  toggleSpinner(event) {
    this.showLoaderLogin = event;
  }

  showHideNavbar(tiempo: number) {
    setTimeout(() => {
      this.sideNavWidth = '18%';
    }, tiempo);
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

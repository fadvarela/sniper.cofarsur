import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/general/usuario.model';

@Component({
  selector: 'app-login-recuperar-pass',
  templateUrl: './login-recuperar-pass.component.html',
  styleUrls: ['./login-recuperar-pass.component.css']
})
export class LoginRecuperarPassComponent implements OnInit, AfterViewInit {
  nomUsuarioFormControl = new FormControl('');
  passFormControl = new FormControl('');
  usuario = new Usuario();
  mostrarProgressBar = false;

  @Output() setIngresoLogin = new EventEmitter();
  @Output() toggleSpinnerEmit = new EventEmitter();

  /*--------Styles---------*/
  matCardRecuperar = 'd-none';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.matCardRecuperar = '';
    }, 900);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggleSpinnerEmit.emit(false);
    }, 500);
  }

  recuperarPass() { }

  setIngresarCuenta() {
    this.matCardRecuperar = 'd-none';
    this.setIngresoLogin.emit();
  }

}

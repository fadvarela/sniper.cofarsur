import { Injectable, OnInit } from '@angular/core';
import {LoginEndPoint } from './login-endpoint';

@Injectable()
export class LoginService implements OnInit {

  constructor(private loginEndPoint: LoginEndPoint) {
  }

  ngOnInit() {

  }

  ValidarUsuario(usuario?: string, password?: string, cuit?: string) {
    return this.loginEndPoint.ValidarUsuario(usuario, password, cuit);
  }

}

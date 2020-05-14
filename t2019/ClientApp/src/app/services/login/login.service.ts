import { Injectable, OnInit } from '@angular/core';
import {LoginEndPoint } from './login-endpoint';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/general/usuario.model';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private loginEndPoint: LoginEndPoint) {
  }

  ValidarUsuario(usuario?: string, password?: string, cuit?: string) {
    return this.loginEndPoint.ValidarUsuario(usuario, password, cuit);
  }

}

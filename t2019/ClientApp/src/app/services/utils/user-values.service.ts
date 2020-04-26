import { SnackBarService } from './snackBar.service';
import { Usuario } from './../../models/general/usuario.model';
import { Injectable, AfterViewInit, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Idle } from 'idlejs/dist';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UserValuesService {
  private routerInfo: BehaviorSubject<boolean>;
  private usuarioLogeado: Usuario;
  private loggedInStatus = false;
  private status = false;
  idle = new Idle()
    .whenNotInteractive()
    .within(15)
    .do(() => {
      if (this.checkCookieExists) {
        this.setLogout();
      }
    }).start();

  constructor(
    private loginService: LoginService,
    private storage: StorageMap,
    private cookieService: CookieService,
    private route: Router,
    private _snackBar: SnackBarService) {
    this.usuarioLogeado = new Usuario();
    this.setLoggedIn(this.cookieService.check('logueado'));
  }

  setLogin(userName: string, pass: string): Promise<boolean> {
    return this.loadLoginUser(userName, pass).then(() => this.usuarioLogeado.Ok);
  }

  loadLoginUser(userName: string, pass: string) {
    return this.loginService.ValidarUsuario(userName, pass).toPromise().then((result: Usuario) => {
      this.usuarioLogeado = result;
      // this.storage.set('logueado', this.usuarioLogeado.Ok).subscribe();
      if (this.usuarioLogeado.Ok) {
        this.cookieService.set('logueado', JSON.stringify(true));
        this.setLoggedIn(true);
        this.route.navigate(['home']);
      }
    });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLogueado() {
    return this.loggedInStatus;
  }

  setLogout() {
    this._snackBar.openSnackBar('snack-warning', 'Redirigiendo al login', 4000);
    this.cookieService.delete('logueado');
    this.storage.delete('logueado');
    this.setLoggedIn(false);
    this.route.navigate(['login']);
  }

  get checkCookieExists() {
    return this.cookieService.check('logueado');
  }

  get getUsuarioValues() {
    return this.usuarioLogeado;
  }



}

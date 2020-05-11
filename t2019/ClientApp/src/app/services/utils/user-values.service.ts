import { SnackBarService } from './snackBar.service';
import { Usuario } from './../../models/general/usuario.model';
import { Injectable, AfterViewInit, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { StorageMap, JSONSchemaObject } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Idle } from 'idlejs/dist';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

@Injectable()
export class UserValuesService {
  private routerInfo: BehaviorSubject<boolean>;
  private usuarioLogueado: Usuario;
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
    private _snackBar: SnackBarService,
    private dialogRef: MatDialog) {
    this.usuarioLogueado = new Usuario();
    this.setLoggedIn(this.cookieService.check('logueado'));
    if (this.isLogueado) {
      this.getUsuarioSuccess(false);
    }
  }

  setLogin(userName: string, pass: string): Promise<boolean> {
    return this.loadLoginUser(userName, pass).then(() => this.usuarioLogueado.Ok);
  }

  loadLoginUser(userName: string, pass: string) {
    return this.loginService.ValidarUsuario(userName, pass).toPromise().then((result: Usuario) => {
      this.usuarioLogueado = result;
      if (this.usuarioLogueado.Ok) {
        this.cookieService.set('logueado', JSON.stringify(true));
        this.storage.set('user', this.getUsuarioSuccess(true)).subscribe();
        this.setLoggedIn(true);
        this.route.navigate(['home']);
      }
    }).catch((error) => { this.getUsuarioValues.Mensaje = error.error; this.getUsuarioValues.Ok = false;});
  }

  getUsuarioSuccess(nuevoLogin) {
    let usuarioCookie = new Usuario();
    if (nuevoLogin) {
      usuarioCookie.IdRol = this.usuarioLogueado.IdRol;
      usuarioCookie.IdUsuario = this.usuarioLogueado.IdUsuario;
      usuarioCookie.Ok = this.usuarioLogueado.Ok;
    } else {
      this.storage.get('user').subscribe((result: Usuario) => {
        usuarioCookie.IdRol = result.IdRol;
        usuarioCookie.IdUsuario = result.IdUsuario;
        usuarioCookie.Ok = result.Ok;
        Object.assign(this.usuarioLogueado, usuarioCookie);
      });
    }
    return usuarioCookie;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLogueado() {
    return this.loggedInStatus;
  }

  setLogout() {
    this.dialogRef.closeAll();
    this._snackBar.openSnackBar('snack-warning', 'Redirigiendo al login', 3000);
    this.removeLogoutData().subscribe((result) => {
      if (result) {
        this.route.navigate(['login']);
      } else {
        this._snackBar.openSnackBar('snack-danger', 'Hubo un problema al cerrar la sesión', 3000);
      }
    });
  }

  removeLogoutData(): Observable<boolean> {
    if (!this.checkCookieExists) {
      return of(false);
    }
    this.cookieService.delete('logueado');
    this.setLoggedIn(false);
    this.storage.get('user').subscribe((result) => { // verifico si hay un usuario cargado en el storage del navegador
      if (result) {
        this.storage.delete('user').subscribe(() => { });
      }
    });
    return of(true);
  }

  get checkCookieExists() {
    return this.cookieService.check('logueado');
  }

  get getUsuarioValues() {
    return this.usuarioLogueado;
  }



}

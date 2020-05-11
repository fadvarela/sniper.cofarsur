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

  /* Objeto para observar la inactividad del usuario.
  si no presiona nada por 15 minutos, lo deslogueamos */
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

  /* Devolvemos una promesa para asi hacer logica en
    el componente.
  */
  setLogin(userName: string, pass: string): Promise<boolean> {
    return this.loadLoginUser(userName, pass).then(() => this.usuarioLogueado.Ok);
  }

  /* Valida contra la BD con usr y pass. Si obtenemos un TRUE como respuesta
    guardamos todos los valores necesarios del usuario en las cookies del browser
  */
  loadLoginUser(userName: string, pass: string) {
    return this.loginService.ValidarUsuario(userName, pass).toPromise().then((result: Usuario) => {
      this.usuarioLogueado = result;
      if (this.usuarioLogueado.Ok) {
        this.cookieService.set('logueado', JSON.stringify(true));
        this.storage.set('user', this.getUsuarioSuccess(true)).subscribe();
        this.setLoggedIn(true);
        this.route.navigate(['home']);
      }
    }).catch((error) => { this.getUsuarioValues.Mensaje = error.error; this.getUsuarioValues.Ok = false; });
  }

  /* Si estamos en la pantalla de LOGIN, envia un TRUE para
   crear un nuevo usuario logueado.
   Si se refresca la pagina, busca los datos que esten
   en las cookies y los obtenemos. */
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

  // Setea el login en TRUE cuando inicia sesion
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  // Nos devuelve el estado del logueo (si esta logueado o no)
  get isLogueado() {
    return this.loggedInStatus;
  }

  // Para desloguearnos. Cierra todos los modals que esten
  // abiertos en la app. Luego llama a funcion para
  // que esten almacenados en la web
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

  // Primero verifica que haya una cookie
  // si existe, elimina todo dato almacenado en el navegador
  // y devuelve un TRUE
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

  // Nos devuelve el estado de la cookie
  // si existe o no
  get checkCookieExists() {
    return this.cookieService.check('logueado');
  }

  // Nos devuelve el objeto del usuario logueado
  get getUsuarioValues() {
    return this.usuarioLogueado;
  }



}

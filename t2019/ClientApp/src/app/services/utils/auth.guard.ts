import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { UserValuesService } from "./user-values.service"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { SenderService } from "./sender.service"

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: UserValuesService,
    private router: Router,
    private senderService: SenderService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let setMostrar;
    if (!this.auth.isLogueado) {
      setMostrar = false;
      this.senderService.enviarObjeto(setMostrar);
      this.router.navigate(['login']);
      return false;
    }
    setMostrar = true;
    this.senderService.enviarObjeto(setMostrar);
    return true;
  }
}

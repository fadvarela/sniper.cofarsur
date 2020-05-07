import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { UserValuesService } from "./user-values.service"
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
    if (state.url === '/login') {
      this.router.navigate(['home']);
    }
    setMostrar = true;
    this.senderService.enviarObjeto(setMostrar);
    return true;
  }
}

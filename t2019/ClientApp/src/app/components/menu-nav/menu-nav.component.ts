import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NavEntity } from 'src/app/models/general/nav-entity.interface';
import { UserValuesService } from 'src/app/services/utils/user-values.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/services/utils/snackBar.service';
import { getNavMenuList } from 'src/app/models/const/nav-const';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  @Output() HomeMenu_LoginAccion_prm = new EventEmitter();
  @Output() HomeMenu_ComponentShow_prm = new EventEmitter();
  idRol: number;
  navMenuList: Array<NavEntity> = [];

  @Input() public set HomeMenu_SetOpcionesXRol_void(IdRol: number) {
    this.Set_HomeMenuXRol(IdRol);
  }

  isExpanded = false;

  constructor(
    private userValuesService: UserValuesService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: SnackBarService) {
    this.navMenuList = getNavMenuList();
  }

  ngOnInit() {
    this.Set_HomeMenuXRol(this.userValuesService.getUsuarioValues.IdRol);
  }

  send_LoginAccion(idAccion: number) {
    this.HomeMenu_LoginAccion_prm.emit(idAccion);
  }


  Set_HomeMenuXRol(IdRol: number) {
    // if (IdRol === 0) {
    //   document.getElementById("btn_homemenu_sniper").style.display = "none";
    //   document.getElementById("btn_homemenu_nomina").style.display = "none";
    //   document.getElementById("btn_homemenu_novedades").style.display = "none";
    //   document.getElementById("btn_homemenu_reportes").style.display = "none";
    // }
    // if (IdRol == 1) {
    //   document.getElementById("btn_homemenu_sniper").style.display = "block";
    //   document.getElementById("btn_homemenu_nomina").style.display = "block";
    //   document.getElementById("btn_homemenu_novedades").style.display = "block";
    //   document.getElementById("btn_homemenu_reportes").style.display = "block";
    // }

    // if (IdRol == 2) {
    //   document.getElementById("btn_homemenu_sniper").style.display = "none";
    //   document.getElementById("btn_homemenu_nomina").style.display = "block";
    //   document.getElementById("btn_homemenu_novedades").style.display = "block";
    //   document.getElementById("btn_homemenu_reportes").style.display = "none";
    // }
  }

  HomeMenu_ComponentShow_void(component: string) {
    this.HomeMenu_ComponentShow_prm.emit(component);
  }

  cerrarSesion() {
    this.userValuesService.setLogout();
  }

  filterMenuItems(menuList) {
    // return menuList.filter(x => x.id ===);
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Input } from '@angular/core';

import { NominaService } from 'src/app/services/rrhh/nomina/nomina.service';
import { Nomina } from 'src/app/models/rrhh/nomina.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  idComponente: number;
  txtParam: any;
  Home_idLoginAccion_Prm: number;
  Home_IdRol_Prm: number;
  Home_ComponentShow_prm: string;
  Home_Wait_prm: number;

  constructor(private nominaService: NominaService) { }
  ngOnInit() {
    this.Home_Get_LoginAccion_Void(1);
  }

  Home_Get_LoginAccion_Void(idAccion:number) {
    if (idAccion == 1) {
      document.getElementById("contenedor").style.opacity = "0.5";
      document.getElementById("contenedor").style.backgroundColor = "black";
      document.getElementById("contenedor").style.pointerEvents = "none";
      document.getElementById("MenuHeader").style.opacity = "0.5";
      document.getElementById("MenuHeader").style.backgroundColor = "black";
      document.getElementById("MenuHeader").style.pointerEvents = "none";
        }
    else {
      document.getElementById("contenedor").style.opacity = "1";
      document.getElementById("contenedor").style.backgroundColor = "";
      document.getElementById("contenedor").style.pointerEvents = "";
      document.getElementById("MenuHeader").style.opacity = "1";
      document.getElementById("MenuHeader").style.backgroundColor = "";
      document.getElementById("MenuHeader").style.pointerEvents = "";
    }
    this.Home_idLoginAccion_Prm = idAccion;
  }

  Home_Get_IdRol_Void(idRol: number) {
    this.Home_IdRol_Prm = idRol;
  }

  Home_ComponentShow_void(componente: string) {
    this.Home_ComponentShow_prm = componente;
  }

  Home_Wait_void(wait: number) {
    this.Home_Wait_prm = wait;
  }

}

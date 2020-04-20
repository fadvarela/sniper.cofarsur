
import { Injectable, OnInit } from '@angular/core';
import { NominaEndPoint } from 'src/app/services/rrhh/nomina/nomina-endpoint';

@Injectable()
export class NominaService implements OnInit {

  constructor(private nominaEndPoint: NominaEndPoint) {
  }

  ngOnInit() {

  }


  getnomina(param?: any) {
    var result = this.nominaEndPoint.getnomina(param);
    return result;
  }

}

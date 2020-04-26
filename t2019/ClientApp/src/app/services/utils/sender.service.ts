import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  private object = new BehaviorSubject<any>(new Object());
  $objSource = this.object.asObservable();

  constructor() { }

  enviarObjeto(data: any) {
    this.object.next(data);
  }
}

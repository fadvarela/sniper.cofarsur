import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  @Output() idMenu = new EventEmitter();
  isExpanded = false;
  constructor(private router: Router) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
  sendMenu(e: number) {
    this.idMenu.emit(e);
    console.log(this.idMenu);
  }
}

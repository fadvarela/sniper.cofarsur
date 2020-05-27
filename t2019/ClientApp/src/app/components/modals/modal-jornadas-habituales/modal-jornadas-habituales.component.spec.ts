/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalJornadasHabitualesComponent } from './modal-jornadas-habituales.component';

describe('ModalJornadasHabitualesComponent', () => {
  let component: ModalJornadasHabitualesComponent;
  let fixture: ComponentFixture<ModalJornadasHabitualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJornadasHabitualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJornadasHabitualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JornadasHabitualesComponent } from './jornadas-habituales.component';

describe('JornadasHabitualesComponent', () => {
  let component: JornadasHabitualesComponent;
  let fixture: ComponentFixture<JornadasHabitualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadasHabitualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadasHabitualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

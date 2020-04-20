import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDiarioComponent } from './parte-diario.component';

describe('ParteDiarioComponent', () => {
  let component: ParteDiarioComponent;
  let fixture: ComponentFixture<ParteDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

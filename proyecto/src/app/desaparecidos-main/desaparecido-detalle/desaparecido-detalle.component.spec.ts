import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparecidoDetalleComponent } from './desaparecido-detalle.component';

describe('DesaparecidoDetalleComponent', () => {
  let component: DesaparecidoDetalleComponent;
  let fixture: ComponentFixture<DesaparecidoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesaparecidoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesaparecidoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

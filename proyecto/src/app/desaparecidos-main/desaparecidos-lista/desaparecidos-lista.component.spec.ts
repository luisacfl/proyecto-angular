import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparecidosListaComponent } from './desaparecidos-lista.component';

describe('DesaparecidosListaComponent', () => {
  let component: DesaparecidosListaComponent;
  let fixture: ComponentFixture<DesaparecidosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesaparecidosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesaparecidosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

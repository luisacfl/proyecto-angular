import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparecidoComponent } from './desaparecido.component';

describe('DesaparecidoComponent', () => {
  let component: DesaparecidoComponent;
  let fixture: ComponentFixture<DesaparecidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesaparecidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesaparecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

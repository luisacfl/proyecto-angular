import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparecidosEditComponent } from './desaparecidos-edit.component';

describe('DesaparecidosEditComponent', () => {
  let component: DesaparecidosEditComponent;
  let fixture: ComponentFixture<DesaparecidosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesaparecidosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesaparecidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

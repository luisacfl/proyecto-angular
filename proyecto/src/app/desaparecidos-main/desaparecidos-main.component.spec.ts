import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparecidosMainComponent } from './desaparecidos-main.component';

describe('DesaparecidosMainComponent', () => {
  let component: DesaparecidosMainComponent;
  let fixture: ComponentFixture<DesaparecidosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesaparecidosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesaparecidosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

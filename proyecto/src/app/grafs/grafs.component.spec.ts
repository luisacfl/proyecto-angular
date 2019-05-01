import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafsComponent } from './grafs.component';

describe('GrafsComponent', () => {
  let component: GrafsComponent;
  let fixture: ComponentFixture<GrafsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

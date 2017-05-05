import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlComponent } from './fleet-control.component';

describe('FleetControlComponent', () => {
  let component: FleetControlComponent;
  let fixture: ComponentFixture<FleetControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

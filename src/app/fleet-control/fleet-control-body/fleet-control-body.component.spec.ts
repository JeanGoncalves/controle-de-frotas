import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlBodyComponent } from './fleet-control-body.component';

describe('FleetControlBodyComponent', () => {
  let component: FleetControlBodyComponent;
  let fixture: ComponentFixture<FleetControlBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

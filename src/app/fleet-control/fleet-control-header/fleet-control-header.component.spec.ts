import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlHeaderComponent } from './fleet-control-header.component';

describe('FleetControlHeaderComponent', () => {
  let component: FleetControlHeaderComponent;
  let fixture: ComponentFixture<FleetControlHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

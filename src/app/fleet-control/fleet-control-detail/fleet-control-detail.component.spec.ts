import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlDetailComponent } from './fleet-control-detail.component';

describe('FleetControlDetailComponent', () => {
  let component: FleetControlDetailComponent;
  let fixture: ComponentFixture<FleetControlDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

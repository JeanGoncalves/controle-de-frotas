import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlListComponent } from './fleet-control-list.component';

describe('FleetControlListComponent', () => {
  let component: FleetControlListComponent;
  let fixture: ComponentFixture<FleetControlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

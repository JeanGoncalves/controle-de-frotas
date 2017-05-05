import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetControlFooterComponent } from './fleet-control-footer.component';

describe('FleetControlFooterComponent', () => {
  let component: FleetControlFooterComponent;
  let fixture: ComponentFixture<FleetControlFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetControlFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetControlFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

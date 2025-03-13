import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCustomerComponent } from './stats-customer.component';

describe('StatsCustomerComponent', () => {
  let component: StatsCustomerComponent;
  let fixture: ComponentFixture<StatsCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsCustomerComponent]
    });
    fixture = TestBed.createComponent(StatsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

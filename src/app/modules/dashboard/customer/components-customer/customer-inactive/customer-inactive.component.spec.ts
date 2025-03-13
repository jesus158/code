import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInactiveComponent } from './customer-inactive.component';

describe('CustomerInactiveComponent', () => {
  let component: CustomerInactiveComponent;
  let fixture: ComponentFixture<CustomerInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInactiveComponent]
    });
    fixture = TestBed.createComponent(CustomerInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

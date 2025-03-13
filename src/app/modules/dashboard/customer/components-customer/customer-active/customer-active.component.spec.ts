import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActiveComponent } from './customer-active.component';

describe('CustomerActiveComponent', () => {
  let component: CustomerActiveComponent;
  let fixture: ComponentFixture<CustomerActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerActiveComponent]
    });
    fixture = TestBed.createComponent(CustomerActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

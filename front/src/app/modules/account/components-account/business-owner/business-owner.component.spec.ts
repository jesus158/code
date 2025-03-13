import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerComponent } from './business-owner.component';

describe('BusinessOwnerComponent', () => {
  let component: BusinessOwnerComponent;
  let fixture: ComponentFixture<BusinessOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessOwnerComponent]
    });
    fixture = TestBed.createComponent(BusinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

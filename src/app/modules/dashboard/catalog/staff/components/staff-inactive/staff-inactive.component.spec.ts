import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInactiveComponent } from './staff-inactive.component';

describe('StaffInactiveComponent', () => {
  let component: StaffInactiveComponent;
  let fixture: ComponentFixture<StaffInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInactiveComponent]
    });
    fixture = TestBed.createComponent(StaffInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

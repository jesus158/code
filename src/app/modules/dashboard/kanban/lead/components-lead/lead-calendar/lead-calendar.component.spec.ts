import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCalendarComponent } from './lead-calendar.component';

describe('LeadCalendarComponent', () => {
  let component: LeadCalendarComponent;
  let fixture: ComponentFixture<LeadCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadCalendarComponent]
    });
    fixture = TestBed.createComponent(LeadCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

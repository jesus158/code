import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsCalendarComponent } from './leads-calendar.component';

describe('LeadsCalendarComponent', () => {
  let component: LeadsCalendarComponent;
  let fixture: ComponentFixture<LeadsCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsCalendarComponent]
    });
    fixture = TestBed.createComponent(LeadsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

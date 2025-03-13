import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsCheckListComponent } from './leads-check-list.component';

describe('LeadsCheckListComponent', () => {
  let component: LeadsCheckListComponent;
  let fixture: ComponentFixture<LeadsCheckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsCheckListComponent]
    });
    fixture = TestBed.createComponent(LeadsCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

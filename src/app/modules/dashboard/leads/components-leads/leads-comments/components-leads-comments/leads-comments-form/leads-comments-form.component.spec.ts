import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsCommentsFormComponent } from './leads-comments-form.component';

describe('LeadsCommentsFormComponent', () => {
  let component: LeadsCommentsFormComponent;
  let fixture: ComponentFixture<LeadsCommentsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsCommentsFormComponent]
    });
    fixture = TestBed.createComponent(LeadsCommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

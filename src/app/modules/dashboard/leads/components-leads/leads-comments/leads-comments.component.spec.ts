import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsCommentsComponent } from './leads-comments.component';

describe('LeadsCommentsComponent', () => {
  let component: LeadsCommentsComponent;
  let fixture: ComponentFixture<LeadsCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsCommentsComponent]
    });
    fixture = TestBed.createComponent(LeadsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

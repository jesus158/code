import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpStatusComponent } from './follow-up-status.component';

describe('FollowUpStatusComponent', () => {
  let component: FollowUpStatusComponent;
  let fixture: ComponentFixture<FollowUpStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowUpStatusComponent]
    });
    fixture = TestBed.createComponent(FollowUpStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

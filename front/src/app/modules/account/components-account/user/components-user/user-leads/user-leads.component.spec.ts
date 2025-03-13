import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeadsComponent } from './user-leads.component';

describe('UserLeadsComponent', () => {
  let component: UserLeadsComponent;
  let fixture: ComponentFixture<UserLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeadsComponent]
    });
    fixture = TestBed.createComponent(UserLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBusinessComponent } from './user-business.component';

describe('UserBusinessComponent', () => {
  let component: UserBusinessComponent;
  let fixture: ComponentFixture<UserBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBusinessComponent]
    });
    fixture = TestBed.createComponent(UserBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

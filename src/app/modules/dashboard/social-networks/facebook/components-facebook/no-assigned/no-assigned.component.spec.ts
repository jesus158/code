import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAssignedComponent } from './no-assigned.component';

describe('NoAssignedComponent', () => {
  let component: NoAssignedComponent;
  let fixture: ComponentFixture<NoAssignedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoAssignedComponent]
    });
    fixture = TestBed.createComponent(NoAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationInactiveComponent } from './workstation-inactive.component';

describe('WorkstationInactiveComponent', () => {
  let component: WorkstationInactiveComponent;
  let fixture: ComponentFixture<WorkstationInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkstationInactiveComponent]
    });
    fixture = TestBed.createComponent(WorkstationInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

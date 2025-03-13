import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTeamInactiveComponent } from './work-team-inactive.component';

describe('WorkTeamInactiveComponent', () => {
  let component: WorkTeamInactiveComponent;
  let fixture: ComponentFixture<WorkTeamInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTeamInactiveComponent]
    });
    fixture = TestBed.createComponent(WorkTeamInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

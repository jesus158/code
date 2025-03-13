import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTeamActiveComponent } from './work-team-active.component';

describe('WorkTeamActiveComponent', () => {
  let component: WorkTeamActiveComponent;
  let fixture: ComponentFixture<WorkTeamActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTeamActiveComponent]
    });
    fixture = TestBed.createComponent(WorkTeamActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

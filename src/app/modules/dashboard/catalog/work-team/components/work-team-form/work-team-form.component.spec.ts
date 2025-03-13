import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTeamFormComponent } from './work-team-form.component';

describe('WorkTeamFormComponent', () => {
  let component: WorkTeamFormComponent;
  let fixture: ComponentFixture<WorkTeamFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTeamFormComponent]
    });
    fixture = TestBed.createComponent(WorkTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

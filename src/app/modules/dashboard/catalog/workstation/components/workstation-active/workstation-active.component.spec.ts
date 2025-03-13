import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationActiveComponent } from './workstation-active.component';

describe('WorkstationActiveComponent', () => {
  let component: WorkstationActiveComponent;
  let fixture: ComponentFixture<WorkstationActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkstationActiveComponent]
    });
    fixture = TestBed.createComponent(WorkstationActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

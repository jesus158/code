import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsFilesComponent } from './leads-files.component';

describe('LeadsFilesComponent', () => {
  let component: LeadsFilesComponent;
  let fixture: ComponentFixture<LeadsFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsFilesComponent]
    });
    fixture = TestBed.createComponent(LeadsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

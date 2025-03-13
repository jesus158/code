import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsFilesModalComponent } from './leads-files-modal.component';

describe('LeadsFilesModalComponent', () => {
  let component: LeadsFilesModalComponent;
  let fixture: ComponentFixture<LeadsFilesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsFilesModalComponent]
    });
    fixture = TestBed.createComponent(LeadsFilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

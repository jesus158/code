import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsActiveComponent } from './leads-active.component';

describe('LeadsActiveComponent', () => {
  let component: LeadsActiveComponent;
  let fixture: ComponentFixture<LeadsActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsActiveComponent]
    });
    fixture = TestBed.createComponent(LeadsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

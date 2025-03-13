import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsContentComponent } from './leads-content.component';

describe('LeadsContentComponent', () => {
  let component: LeadsContentComponent;
  let fixture: ComponentFixture<LeadsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsContentComponent]
    });
    fixture = TestBed.createComponent(LeadsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDescriptionComponent } from './lead-description.component';

describe('LeadDescriptionComponent', () => {
  let component: LeadDescriptionComponent;
  let fixture: ComponentFixture<LeadDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadDescriptionComponent]
    });
    fixture = TestBed.createComponent(LeadDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

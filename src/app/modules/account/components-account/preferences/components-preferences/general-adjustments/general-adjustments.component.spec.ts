import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAdjustmentsComponent } from './general-adjustments.component';

describe('GeneralAdjustmentsComponent', () => {
  let component: GeneralAdjustmentsComponent;
  let fixture: ComponentFixture<GeneralAdjustmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAdjustmentsComponent]
    });
    fixture = TestBed.createComponent(GeneralAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansDetailModalComponent } from './plans-detail-modal.component';

describe('PlansDetailModalComponent', () => {
  let component: PlansDetailModalComponent;
  let fixture: ComponentFixture<PlansDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlansDetailModalComponent]
    });
    fixture = TestBed.createComponent(PlansDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

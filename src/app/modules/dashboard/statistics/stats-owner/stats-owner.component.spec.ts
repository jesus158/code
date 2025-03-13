import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsOwnerComponent } from './stats-owner.component';

describe('StatsOwnerComponent', () => {
  let component: StatsOwnerComponent;
  let fixture: ComponentFixture<StatsOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsOwnerComponent]
    });
    fixture = TestBed.createComponent(StatsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

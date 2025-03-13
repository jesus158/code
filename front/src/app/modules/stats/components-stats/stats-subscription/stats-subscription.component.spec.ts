import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSubscriptionComponent } from './stats-subscription.component';

describe('StatsSubscriptionComponent', () => {
  let component: StatsSubscriptionComponent;
  let fixture: ComponentFixture<StatsSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsSubscriptionComponent]
    });
    fixture = TestBed.createComponent(StatsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

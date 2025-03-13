import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAccountComponent } from './stats-account.component';

describe('StatsAccountComponent', () => {
  let component: StatsAccountComponent;
  let fixture: ComponentFixture<StatsAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsAccountComponent]
    });
    fixture = TestBed.createComponent(StatsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

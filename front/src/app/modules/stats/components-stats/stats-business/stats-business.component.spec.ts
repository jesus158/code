import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBusinessComponent } from './stats-business.component';

describe('StatsBusinessComponent', () => {
  let component: StatsBusinessComponent;
  let fixture: ComponentFixture<StatsBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsBusinessComponent]
    });
    fixture = TestBed.createComponent(StatsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

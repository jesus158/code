import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUserComponent } from './stats-user.component';

describe('StatsUserComponent', () => {
  let component: StatsUserComponent;
  let fixture: ComponentFixture<StatsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsUserComponent]
    });
    fixture = TestBed.createComponent(StatsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

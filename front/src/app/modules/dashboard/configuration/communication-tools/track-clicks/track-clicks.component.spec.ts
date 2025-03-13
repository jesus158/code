import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackClicksComponent } from './track-clicks.component';

describe('TrackClicksComponent', () => {
  let component: TrackClicksComponent;
  let fixture: ComponentFixture<TrackClicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackClicksComponent]
    });
    fixture = TestBed.createComponent(TrackClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

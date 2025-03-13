import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrackClicksComponent } from './modal-track-clicks.component';

describe('ModalTrackClicksComponent', () => {
  let component: ModalTrackClicksComponent;
  let fixture: ComponentFixture<ModalTrackClicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTrackClicksComponent]
    });
    fixture = TestBed.createComponent(ModalTrackClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

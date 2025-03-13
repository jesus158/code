import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeInactiveComponent } from './office-inactive.component';

describe('OfficeInactiveComponent', () => {
  let component: OfficeInactiveComponent;
  let fixture: ComponentFixture<OfficeInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeInactiveComponent]
    });
    fixture = TestBed.createComponent(OfficeInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

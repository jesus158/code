import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeActiveComponent } from './office-active.component';

describe('OfficeActiveComponent', () => {
  let component: OfficeActiveComponent;
  let fixture: ComponentFixture<OfficeActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeActiveComponent]
    });
    fixture = TestBed.createComponent(OfficeActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

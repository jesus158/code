import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRecoveryCodeComponent } from './get-recovery-code.component';

describe('GetRecoveryCodeComponent', () => {
  let component: GetRecoveryCodeComponent;
  let fixture: ComponentFixture<GetRecoveryCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRecoveryCodeComponent]
    });
    fixture = TestBed.createComponent(GetRecoveryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

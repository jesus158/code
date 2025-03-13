import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalesbotComponent } from './modal-salesbot.component';

describe('ModalSalesbotComponent', () => {
  let component: ModalSalesbotComponent;
  let fixture: ComponentFixture<ModalSalesbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSalesbotComponent]
    });
    fixture = TestBed.createComponent(ModalSalesbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

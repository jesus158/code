import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMenuBarComponent } from './modal-menu-bar.component';

describe('ModalMenuBarComponent', () => {
  let component: ModalMenuBarComponent;
  let fixture: ComponentFixture<ModalMenuBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMenuBarComponent]
    });
    fixture = TestBed.createComponent(ModalMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

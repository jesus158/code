import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesbotComponent } from './salesbot.component';

describe('SalesbotComponent', () => {
  let component: SalesbotComponent;
  let fixture: ComponentFixture<SalesbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesbotComponent]
    });
    fixture = TestBed.createComponent(SalesbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

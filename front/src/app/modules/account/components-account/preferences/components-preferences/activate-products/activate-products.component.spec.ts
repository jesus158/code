import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateProductsComponent } from './activate-products.component';

describe('ActivateProductsComponent', () => {
  let component: ActivateProductsComponent;
  let fixture: ComponentFixture<ActivateProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateProductsComponent]
    });
    fixture = TestBed.createComponent(ActivateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

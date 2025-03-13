import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCatalogComponent } from './components-catalog.component';

describe('ComponentsCatalogComponent', () => {
  let component: ComponentsCatalogComponent;
  let fixture: ComponentFixture<ComponentsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsCatalogComponent]
    });
    fixture = TestBed.createComponent(ComponentsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

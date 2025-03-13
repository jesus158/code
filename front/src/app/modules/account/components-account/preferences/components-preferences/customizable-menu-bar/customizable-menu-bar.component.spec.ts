import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableMenuBarComponent } from './customizable-menu-bar.component';

describe('CustomizableMenuBarComponent', () => {
  let component: CustomizableMenuBarComponent;
  let fixture: ComponentFixture<CustomizableMenuBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizableMenuBarComponent]
    });
    fixture = TestBed.createComponent(CustomizableMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

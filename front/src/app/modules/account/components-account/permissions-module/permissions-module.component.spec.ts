import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsModuleComponent } from './permissions-module.component';

describe('PermissionsModuleComponent', () => {
  let component: PermissionsModuleComponent;
  let fixture: ComponentFixture<PermissionsModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionsModuleComponent]
    });
    fixture = TestBed.createComponent(PermissionsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

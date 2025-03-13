import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModulesComponent } from './main-modules.component';

describe('MainModulesComponent', () => {
  let component: MainModulesComponent;
  let fixture: ComponentFixture<MainModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainModulesComponent]
    });
    fixture = TestBed.createComponent(MainModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

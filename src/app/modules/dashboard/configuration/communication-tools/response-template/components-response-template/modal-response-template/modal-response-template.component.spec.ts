import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponseTemplateComponent } from './modal-response-template.component';

describe('ModalResponseTemplateComponent', () => {
  let component: ModalResponseTemplateComponent;
  let fixture: ComponentFixture<ModalResponseTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalResponseTemplateComponent]
    });
    fixture = TestBed.createComponent(ModalResponseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

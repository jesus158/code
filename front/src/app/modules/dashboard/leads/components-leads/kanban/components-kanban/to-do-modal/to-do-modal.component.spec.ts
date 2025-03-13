import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoModalComponent } from './to-do-modal.component';

describe('ToDoModalComponent', () => {
  let component: ToDoModalComponent;
  let fixture: ComponentFixture<ToDoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoModalComponent]
    });
    fixture = TestBed.createComponent(ToDoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListModalComponent } from './to-do-list-modal.component';

describe('ToDoListModalComponent', () => {
  let component: ToDoListModalComponent;
  let fixture: ComponentFixture<ToDoListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoListModalComponent]
    });
    fixture = TestBed.createComponent(ToDoListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

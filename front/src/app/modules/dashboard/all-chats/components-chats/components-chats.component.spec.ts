import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsChatsComponent } from './components-chats.component';

describe('ComponentsChatsComponent', () => {
  let component: ComponentsChatsComponent;
  let fixture: ComponentFixture<ComponentsChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsChatsComponent]
    });
    fixture = TestBed.createComponent(ComponentsChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImboxComponent } from './chat-imbox.component';

describe('ChatImboxComponent', () => {
  let component: ChatImboxComponent;
  let fixture: ComponentFixture<ChatImboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatImboxComponent]
    });
    fixture = TestBed.createComponent(ChatImboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLeadsMessagesComponent } from './chat-leads-messages.component';

describe('ChatLeadsMessagesComponent', () => {
  let component: ChatLeadsMessagesComponent;
  let fixture: ComponentFixture<ChatLeadsMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLeadsMessagesComponent]
    });
    fixture = TestBed.createComponent(ChatLeadsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

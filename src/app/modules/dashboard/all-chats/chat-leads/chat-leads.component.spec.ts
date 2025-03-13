import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLeadsComponent } from './chat-leads.component';

describe('ChatLeadsComponent', () => {
  let component: ChatLeadsComponent;
  let fixture: ComponentFixture<ChatLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLeadsComponent]
    });
    fixture = TestBed.createComponent(ChatLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

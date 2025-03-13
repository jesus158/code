import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateLiveChatComponent } from './activate-live-chat.component';

describe('ActivateLiveChatComponent', () => {
  let component: ActivateLiveChatComponent;
  let fixture: ComponentFixture<ActivateLiveChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateLiveChatComponent]
    });
    fixture = TestBed.createComponent(ActivateLiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

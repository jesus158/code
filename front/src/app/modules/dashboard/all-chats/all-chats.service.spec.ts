import { TestBed } from '@angular/core/testing';

import { AllChatsService } from './all-chats.service';

describe('AllChatsService', () => {
  let service: AllChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

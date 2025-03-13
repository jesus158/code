import { Test, TestingModule } from '@nestjs/testing';
import { LeadChatService } from './lead-chat.service';

describe('LeadChatService', () => {
  let service: LeadChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadChatService],
    }).compile();

    service = module.get<LeadChatService>(LeadChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

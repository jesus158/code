import { Test, TestingModule } from '@nestjs/testing';
import { LeadChatController } from './lead-chat.controller';
import { LeadChatService } from './lead-chat.service';

describe('LeadChatController', () => {
  let controller: LeadChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadChatController],
      providers: [LeadChatService],
    }).compile();

    controller = module.get<LeadChatController>(LeadChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

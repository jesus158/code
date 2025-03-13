import { Test, TestingModule } from '@nestjs/testing';
import { ReceiveMessagesService } from './receive_messages.service';

describe('ReceiveMessagesService', () => {
  let service: ReceiveMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiveMessagesService],
    }).compile();

    service = module.get<ReceiveMessagesService>(ReceiveMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

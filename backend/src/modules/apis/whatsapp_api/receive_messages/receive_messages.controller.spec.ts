import { Test, TestingModule } from '@nestjs/testing';
import { ReceiveMessagesController } from './receive_messages.controller';
import { ReceiveMessagesService } from './receive_messages.service';

describe('ReceiveMessagesController', () => {
  let controller: ReceiveMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiveMessagesController],
      providers: [ReceiveMessagesService],
    }).compile();

    controller = module.get<ReceiveMessagesController>(
      ReceiveMessagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

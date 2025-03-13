import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappApiController } from './whatsapp_api.controller';
import { WhatsappApiService } from './whatsapp_api.service';

describe('WhatsappApiController', () => {
  let controller: WhatsappApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappApiController],
      providers: [WhatsappApiService],
    }).compile();

    controller = module.get<WhatsappApiController>(WhatsappApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

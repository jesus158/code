import { Test, TestingModule } from '@nestjs/testing';
import { SalesbotController } from './salesbot.controller';
import { SalesbotService } from './salesbot.service';

describe('SalesbotController', () => {
  let controller: SalesbotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesbotController],
      providers: [SalesbotService],
    }).compile();

    controller = module.get<SalesbotController>(SalesbotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

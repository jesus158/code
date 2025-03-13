import { Test, TestingModule } from '@nestjs/testing';
import { SalesbotService } from './salesbot.service';

describe('SalesbotService', () => {
  let service: SalesbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesbotService],
    }).compile();

    service = module.get<SalesbotService>(SalesbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

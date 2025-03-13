import { Test, TestingModule } from '@nestjs/testing';
import { RegisterNumbersService } from './register_numbers.service';

describe('RegisterNumbersService', () => {
  let service: RegisterNumbersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterNumbersService],
    }).compile();

    service = module.get<RegisterNumbersService>(RegisterNumbersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReturnResponsesService } from './return_responses.service';

describe('ReturnResponsesService', () => {
  let service: ReturnResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnResponsesService],
    }).compile();

    service = module.get<ReturnResponsesService>(ReturnResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

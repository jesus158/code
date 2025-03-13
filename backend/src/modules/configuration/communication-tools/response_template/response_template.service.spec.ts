import { Test, TestingModule } from '@nestjs/testing';
import { ResponseTemplateService } from './response_template.service';

describe('ResponseTemplateService', () => {
  let service: ResponseTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseTemplateService],
    }).compile();

    service = module.get<ResponseTemplateService>(ResponseTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

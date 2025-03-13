import { Test, TestingModule } from '@nestjs/testing';
import { IcategoryService } from './icategory.service';

describe('IcategoryService', () => {
  let service: IcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcategoryService],
    }).compile();

    service = module.get<IcategoryService>(IcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

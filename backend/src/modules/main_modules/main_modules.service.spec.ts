import { Test, TestingModule } from '@nestjs/testing';
import { MainModulesService } from './main_modules.service';

describe('MainModulesService', () => {
  let service: MainModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainModulesService],
    }).compile();

    service = module.get<MainModulesService>(MainModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

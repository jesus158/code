import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsModulesService } from './permissions_modules.service';

describe('PermissionsModulesService', () => {
  let service: PermissionsModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsModulesService],
    }).compile();

    service = module.get<PermissionsModulesService>(PermissionsModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

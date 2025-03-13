import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsModulesController } from './permissions_modules.controller';
import { PermissionsModulesService } from './permissions_modules.service';

describe('PermissionsModulesController', () => {
  let controller: PermissionsModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsModulesController],
      providers: [PermissionsModulesService],
    }).compile();

    controller = module.get<PermissionsModulesController>(
      PermissionsModulesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

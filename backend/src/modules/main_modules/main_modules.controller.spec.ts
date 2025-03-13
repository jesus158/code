import { Test, TestingModule } from '@nestjs/testing';
import { MainModulesController } from './main_modules.controller';
import { MainModulesService } from './main_modules.service';

describe('MainModulesController', () => {
  let controller: MainModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainModulesController],
      providers: [MainModulesService],
    }).compile();

    controller = module.get<MainModulesController>(MainModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

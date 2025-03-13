import { Test, TestingModule } from '@nestjs/testing';
import { IcategoryController } from './icategory.controller';
import { IcategoryService } from './icategory.service';

describe('IcategoryController', () => {
  let controller: IcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcategoryController],
      providers: [IcategoryService],
    }).compile();

    controller = module.get<IcategoryController>(IcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BusinessOwnerController } from './business_owner.controller';
import { BusinessOwnerService } from './business_owner.service';

describe('BusinessOwnerController', () => {
  let controller: BusinessOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessOwnerController],
      providers: [BusinessOwnerService],
    }).compile();

    controller = module.get<BusinessOwnerController>(BusinessOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

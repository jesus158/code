import { Test, TestingModule } from '@nestjs/testing';
import { FacebookApiController } from './facebook_api.controller';
import { FacebookApiService } from './facebook_api.service';

describe('FacebookApiController', () => {
  let controller: FacebookApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookApiController],
      providers: [FacebookApiService],
    }).compile();

    controller = module.get<FacebookApiController>(FacebookApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

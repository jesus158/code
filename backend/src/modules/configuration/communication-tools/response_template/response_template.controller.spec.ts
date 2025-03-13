import { Test, TestingModule } from '@nestjs/testing';
import { ResponseTemplateController } from './response_template.controller';
import { ResponseTemplateService } from './response_template.service';

describe('ResponseTemplateController', () => {
  let controller: ResponseTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseTemplateController],
      providers: [ResponseTemplateService],
    }).compile();

    controller = module.get<ResponseTemplateController>(
      ResponseTemplateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

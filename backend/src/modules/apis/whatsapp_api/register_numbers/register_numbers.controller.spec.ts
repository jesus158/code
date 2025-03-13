import { Test, TestingModule } from '@nestjs/testing';
import { RegisterNumbersController } from './register_numbers.controller';
import { RegisterNumbersService } from './register_numbers.service';

describe('RegisterNumbersController', () => {
  let controller: RegisterNumbersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterNumbersController],
      providers: [RegisterNumbersService],
    }).compile();

    controller = module.get<RegisterNumbersController>(
      RegisterNumbersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

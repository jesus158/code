import { Test, TestingModule } from '@nestjs/testing';
import { TrackClicksController } from './track_clicks.controller';
import { TrackClicksService } from './track_clicks.service';

describe('TrackClicksController', () => {
  let controller: TrackClicksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackClicksController],
      providers: [TrackClicksService],
    }).compile();

    controller = module.get<TrackClicksController>(TrackClicksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

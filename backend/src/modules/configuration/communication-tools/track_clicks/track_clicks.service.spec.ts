import { Test, TestingModule } from '@nestjs/testing';
import { TrackClicksService } from './track_clicks.service';

describe('TrackClicksService', () => {
  let service: TrackClicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackClicksService],
    }).compile();

    service = module.get<TrackClicksService>(TrackClicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

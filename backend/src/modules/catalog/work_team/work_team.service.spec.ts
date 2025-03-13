import { Test, TestingModule } from '@nestjs/testing';
import { WorkTeamService } from './work_team.service';

describe('WorkTeamService', () => {
  let service: WorkTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTeamService],
    }).compile();

    service = module.get<WorkTeamService>(WorkTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

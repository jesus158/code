import { Test, TestingModule } from '@nestjs/testing';
import { WorkTeamController } from './work_team.controller';
import { WorkTeamService } from './work_team.service';

describe('WorkTeamController', () => {
  let controller: WorkTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkTeamController],
      providers: [WorkTeamService],
    }).compile();

    controller = module.get<WorkTeamController>(WorkTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

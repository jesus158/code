import { TestBed } from '@angular/core/testing';

import { WorkTeamService } from './work-team.service';

describe('WorkTeamService', () => {
  let service: WorkTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LeadsCheckListService } from './leads-check-list.service';

describe('LeadsCheckListService', () => {
  let service: LeadsCheckListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsCheckListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

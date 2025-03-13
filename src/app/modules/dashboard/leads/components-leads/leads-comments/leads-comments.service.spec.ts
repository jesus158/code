import { TestBed } from '@angular/core/testing';

import { LeadsCommentsService } from './leads-comments.service';

describe('LeadsCommentsService', () => {
  let service: LeadsCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

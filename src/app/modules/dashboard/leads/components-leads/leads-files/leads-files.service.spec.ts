import { TestBed } from '@angular/core/testing';

import { LeadsFilesService } from './leads-files.service';

describe('LeadsFilesService', () => {
  let service: LeadsFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

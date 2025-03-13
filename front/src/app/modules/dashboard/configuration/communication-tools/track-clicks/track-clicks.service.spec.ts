import { TestBed } from '@angular/core/testing';

import { TrackClicksService } from './track-clicks.service';

describe('TrackClicksService', () => {
  let service: TrackClicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackClicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

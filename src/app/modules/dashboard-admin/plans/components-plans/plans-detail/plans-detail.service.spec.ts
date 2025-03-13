import { TestBed } from '@angular/core/testing';

import { PlansDetailService } from './plans-detail.service';

describe('PlansDetailService', () => {
  let service: PlansDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

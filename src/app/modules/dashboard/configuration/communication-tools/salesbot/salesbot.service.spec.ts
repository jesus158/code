import { TestBed } from '@angular/core/testing';

import { SalesbotService } from './salesbot.service';

describe('SalesbotService', () => {
  let service: SalesbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

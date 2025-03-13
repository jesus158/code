import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { businessOwnerGuard } from './business-owner.guard';

describe('businessOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => businessOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

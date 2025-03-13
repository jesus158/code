import { TestBed } from '@angular/core/testing';

import { MainModulesService } from './main-modules.service';

describe('MainModulesService', () => {
  let service: MainModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

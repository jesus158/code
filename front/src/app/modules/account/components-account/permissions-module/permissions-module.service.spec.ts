import { TestBed } from '@angular/core/testing';

import { PermissionsModuleService } from './permissions-module.service';

describe('PermissionsModuleService', () => {
  let service: PermissionsModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

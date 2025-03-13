import { TestBed } from '@angular/core/testing';

import { ResponseTemplateService } from './response-template.service';

describe('ResponseTemplateService', () => {
  let service: ResponseTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StorageAwsS3Service } from './storage-aws-s3.service';

describe('StorageAwsS3Service', () => {
  let service: StorageAwsS3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAwsS3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

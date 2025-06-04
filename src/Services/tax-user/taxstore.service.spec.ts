import { TestBed } from '@angular/core/testing';

import { TaxstoreService } from './taxstore.service';

describe('TaxstoreService', () => {
  let service: TaxstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

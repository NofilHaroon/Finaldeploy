import { TestBed } from '@angular/core/testing';

import { ListingtestService } from './listingtest.service';

describe('ListingtestService', () => {
  let service: ListingtestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingtestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

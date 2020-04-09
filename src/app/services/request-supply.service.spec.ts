import { TestBed } from '@angular/core/testing';

import { RequestSupplyService } from './request-supply.service';

describe('RequestSupplyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestSupplyService = TestBed.get(RequestSupplyService);
    expect(service).toBeTruthy();
  });
});

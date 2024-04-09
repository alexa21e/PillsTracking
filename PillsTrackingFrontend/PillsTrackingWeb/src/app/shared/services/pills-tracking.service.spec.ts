import { TestBed } from '@angular/core/testing';

import { PillsTrackingService } from './pills-tracking.service';

describe('PillsTrackingService', () => {
  let service: PillsTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PillsTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

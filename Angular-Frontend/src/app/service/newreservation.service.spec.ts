import { TestBed, inject } from '@angular/core/testing';

import { NewreservationService } from './newreservation.service';

describe('NewreservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewreservationService]
    });
  });

  it('should be created', inject([NewreservationService], (service: NewreservationService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ConvergenceService } from './convergence.service';

describe('ConvergenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvergenceService]
    });
  });

  it('should be created', inject([ConvergenceService], (service: ConvergenceService) => {
    expect(service).toBeTruthy();
  }));
});

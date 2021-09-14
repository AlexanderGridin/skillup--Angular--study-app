import { TestBed } from '@angular/core/testing';

import { DirectionsOfStudyService } from './directions-of-study.service';

describe('DirectionsOfStudyService', () => {
  let service: DirectionsOfStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionsOfStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

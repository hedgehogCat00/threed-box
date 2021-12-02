import { TestBed } from '@angular/core/testing';

import { ThreedBoxService } from './threed-box.service';

describe('ThreedBoxService', () => {
  let service: ThreedBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreedBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

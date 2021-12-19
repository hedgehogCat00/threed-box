import { TestBed } from '@angular/core/testing';

import { StatesUtilService } from './states-util.service';

describe('StatesUtilService', () => {
  let service: StatesUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

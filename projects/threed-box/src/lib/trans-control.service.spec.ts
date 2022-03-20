import { TestBed } from '@angular/core/testing';

import { TransControlService } from './trans-control.service';

describe('TransControlService', () => {
  let service: TransControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

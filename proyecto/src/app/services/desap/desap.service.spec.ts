import { TestBed } from '@angular/core/testing';

import { DesapService } from './desap.service';

describe('DesapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesapService = TestBed.get(DesapService);
    expect(service).toBeTruthy();
  });
});

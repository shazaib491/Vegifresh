import { TestBed } from '@angular/core/testing';

import { BackServiceProviderService } from './back-service-provider.service';

describe('BackServiceProviderService', () => {
  let service: BackServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

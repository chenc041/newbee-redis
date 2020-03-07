import { TestBed } from '@angular/core/testing';

import { CommonHttpInterceptor } from './common-http.interceptor';

describe('CommonHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommonHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommonHttpInterceptor = TestBed.inject(CommonHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

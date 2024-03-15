import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerGuardGuard } from './seller-guard.guard';

describe('sellerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

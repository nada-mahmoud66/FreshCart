import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authenGuard } from './authen.guard';

describe('authenGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

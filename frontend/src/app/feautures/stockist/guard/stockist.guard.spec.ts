import { TestBed } from '@angular/core/testing';

import { StockistGuard } from './stockist.guard';

describe('StockistGuard', () => {
  let guard: StockistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

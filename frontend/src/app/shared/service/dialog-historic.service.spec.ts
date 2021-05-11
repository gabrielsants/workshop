import { TestBed } from '@angular/core/testing';

import { DialogHistoricService } from './dialog-historic.service';

describe('DialogHistoricService', () => {
  let service: DialogHistoricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogHistoricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

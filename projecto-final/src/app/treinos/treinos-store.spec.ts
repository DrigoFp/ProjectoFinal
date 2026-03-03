import { TestBed } from '@angular/core/testing';

import { TreinosStore } from './treinos-store';

describe('TreinosStore', () => {
  let service: TreinosStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreinosStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

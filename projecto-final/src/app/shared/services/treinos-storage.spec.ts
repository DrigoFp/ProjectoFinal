import { TestBed } from '@angular/core/testing';

import { TreinosStorage } from './treinos-storage.service';

describe('TreinosStorage', () => {
  let service: TreinosStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreinosStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Ecobank } from './ecobank';

describe('Ecobank', () => {
  let service: Ecobank;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ecobank);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

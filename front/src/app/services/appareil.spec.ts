import { TestBed } from '@angular/core/testing';
import { Appareil } from './appareil';

describe('Appareil', () => {
  let service: Appareil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Appareil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

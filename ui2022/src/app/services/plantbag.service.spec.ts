import { TestBed } from '@angular/core/testing';

import { PlantbagService } from './plantbag.service';

describe('PlantbagService', () => {
  let service: PlantbagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantbagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

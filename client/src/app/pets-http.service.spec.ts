import { TestBed, inject } from '@angular/core/testing';

import { PetsHttpService } from './pets-http.service';

describe('PetsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetsHttpService]
    });
  });

  it('should be created', inject([PetsHttpService], (service: PetsHttpService) => {
    expect(service).toBeTruthy();
  }));
});

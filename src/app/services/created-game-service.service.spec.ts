import { TestBed } from '@angular/core/testing';

import { CreatedGameServiceService } from './created-game-service.service';

describe('CreatedGameServiceService', () => {
  let service: CreatedGameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatedGameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

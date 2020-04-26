/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserValuesService } from './user-values.service';

describe('Service: UserValues', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserValuesService]
    });
  });

  it('should ...', inject([UserValuesService], (service: UserValuesService) => {
    expect(service).toBeTruthy();
  }));
});

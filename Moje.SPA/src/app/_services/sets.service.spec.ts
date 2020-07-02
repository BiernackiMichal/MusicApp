/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SetsService } from './sets.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Sets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetsService],
      imports: [FormsModule, HttpClientModule],
    });
  });

  it('should ...', inject([SetsService], (service: SetsService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SongsService } from './songs.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Songs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongsService],
      imports: [HttpClientModule],
    });
  });

  it('should ...', inject([SongsService], (service: SongsService) => {
    expect(service).toBeTruthy();
  }));
});

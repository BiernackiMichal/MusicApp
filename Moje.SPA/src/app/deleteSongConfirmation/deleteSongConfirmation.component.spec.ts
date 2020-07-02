/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeleteSongConfirmationComponent } from './deleteSongConfirmation.component';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteSongConfirmationComponent', () => {
  let component: DeleteSongConfirmationComponent;
  let fixture: ComponentFixture<DeleteSongConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSongConfirmationComponent ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSongConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

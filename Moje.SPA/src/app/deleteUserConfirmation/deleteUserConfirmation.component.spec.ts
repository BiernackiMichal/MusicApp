/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeleteUserConfirmationComponent } from './deleteUserConfirmation.component';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteUserConfirmationComponent', () => {
  let component: DeleteUserConfirmationComponent;
  let fixture: ComponentFixture<DeleteUserConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserConfirmationComponent ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

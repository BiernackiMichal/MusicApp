/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditUserFormComponent } from './EditUserForm.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatCardModule, MatCardTitle } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('EditUserFormComponent', () => {
  let component: EditUserFormComponent;
  let fixture: ComponentFixture<EditUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule, ToastrModule, ToastrModule.forRoot( )],
      declarations: [ EditUserFormComponent, MatCardTitle],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

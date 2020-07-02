/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddSongFormComponent } from './addSongForm.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AddSongFormComponent', () => {
  let component: AddSongFormComponent;
  let fixture: ComponentFixture<AddSongFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSongFormComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

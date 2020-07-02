/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EditSongFormComponent } from './editSongForm.component';
import { MatCardTitle, MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('EditSongFormComponent', () => {
  let component: EditSongFormComponent;
  let fixture: ComponentFixture<EditSongFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSongFormComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

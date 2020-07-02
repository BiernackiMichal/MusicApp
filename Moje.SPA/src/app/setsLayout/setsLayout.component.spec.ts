/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SetsLayoutComponent } from './setsLayout.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';

describe('SetsLayoutComponent', () => {
  let component: SetsLayoutComponent;
  let fixture: ComponentFixture<SetsLayoutComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsLayoutComponent ],
      imports: [FormsModule, MatTableModule, HttpClientModule, RouterTestingModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });
});

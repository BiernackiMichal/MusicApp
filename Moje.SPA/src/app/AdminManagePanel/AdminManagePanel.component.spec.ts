/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdminManagePanelComponent } from './AdminManagePanel.component';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockedAuthService } from '../_services/mockedAuthService';



describe('AdminManagePanelComponent', () => {
  let component: AdminManagePanelComponent;
  let fixture: ComponentFixture<AdminManagePanelComponent>;
  let mockedAuthService: MockedAuthService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagePanelComponent ],
      imports: [MatTableModule, HttpClientModule, RouterTestingModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: []
    })
    .compileComponents();
    const role = '';
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

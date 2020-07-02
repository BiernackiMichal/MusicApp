/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { throwError } from 'rxjs';

import { AddSetFormComponent } from './addSetForm.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { SetsService } from '../_services/sets.service';
import { Router, Routes } from '@angular/router';

import {Location} from '@angular/common';
import { DOMHelper } from '../testing/dom-helper';
import { of, observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../home/home.component';

describe('AddSetFormComponent', () => {

  let component: AddSetFormComponent;
  let fixture: ComponentFixture<AddSetFormComponent>;
  let domHelper: DOMHelper<AddSetFormComponent>;
  let setsServiceMock: any;
  let authServiceMock: any;


  beforeEach(async(() => {
    setsServiceMock = jasmine.createSpyObj('SetsService', ['addSet']);
    setsServiceMock.addSet.and.returnValue(of(''));
    authServiceMock = jasmine.createSpyObj('AuthService', ['decodedToken']);
    authServiceMock.decodedToken.and.returnValue({ unique_name: 'name' });


    TestBed.configureTestingModule({
      declarations: [ AddSetFormComponent ],
      imports: [FormsModule, RouterTestingModule, RouterTestingModule.withRoutes([
        {path: 'home', component: HomeComponent}
      ]), ToastrModule.forRoot(), BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: SetsService, useValue: setsServiceMock},
        {provide: AuthService, useValue: authServiceMock}
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetFormComponent);
    component = fixture.componentInstance;
    domHelper = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should contain Formularz dodawania seta       in mat-card-title tag', () => {
    expect(domHelper.textContentByCss('mat-card-title'))
    .toBe('Formularz dodawania seta       ');
   });

  it('should navigate to / before button click', () => {
      const location = TestBed.inject(Location);
      expect(location.path()).toBe('');
   });

  it('should navigate to /home after Anuluj button click', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');
      domHelper.clickButton('Anuluj');
      expect(router.navigateByUrl).
      toHaveBeenCalledWith(router.createUrlTree(['/home']),
      {skipLocationChange: false, replaceUrl: false});
   });

  it('should navigate to /home ', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');
      component.navigateToHomeComp();
      fixture.detectChanges();
      expect(router.navigateByUrl).
      toHaveBeenCalledWith(router.createUrlTree(['home']),
      {skipLocationChange: false});
   });

  it('form should contain 4 inputs', () => {
    const inputs =  fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toEqual(4);
   });

  it('should execute addSet method on Dodaj set button click', () => {
    spyOn(component, 'addSet');
    domHelper.clickButton('Dodaj set');
    expect(component.addSet).toHaveBeenCalled();
   });

  it('should execute addedSetDateTime method on addSet method call', () => {
    spyOn(component, 'addedSetDateTime');
    component.addSet();
    expect(component.addedSetDateTime).toHaveBeenCalled();
  });

  it('should execute whoIsAddingSet method on addSet method call', () => {
    spyOn(component, 'whoIsAddingSet');
    component.addSet();
    expect(component.whoIsAddingSet).toHaveBeenCalled();
  });

  it('should call navigateToHomeComp method after addSet method succeed', () => {
    spyOn(component, 'navigateToHomeComp');
    component.addSet();
    expect(component.navigateToHomeComp).toHaveBeenCalled();
  });

  it('should call showSuccessMessage method after addSet method succeed', () => {
    spyOn(component, 'showSuccessMessage');
    component.addSet();
    expect(component.showSuccessMessage).toHaveBeenCalled();
  });

  it('should call showFailMessage method if addSet method throw an error', () => {
    spyOn(component, 'showFailMessage');
    setsServiceMock.addSet.and.returnValue (throwError({error: 404}));
    component.addSet();
    expect(component.showFailMessage).toHaveBeenCalled();
  });

});


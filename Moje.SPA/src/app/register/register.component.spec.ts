/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { DOMHelper } from '../testing/dom-helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../_services/auth.service';
import { AuthServiceMock } from '../testing/AuthServiceMock';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let domHelper: DOMHelper<RegisterComponent>;
  let authServiceMock: any;
  beforeEach(async(() => {

    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);
    authServiceMock.register.and.returnValue(of(''));

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule, RouterTestingModule.withRoutes([
        {path: '', component: LoginComponent}
      ])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    domHelper = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title Rejestracja in mat card title', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const title = el.querySelector('mat-card-title');
    expect(title.textContent).toContain('Rejestracja');
  });

  it('should contain 2 inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toEqual(2);
  });

  it('should navigate to home component after navigateToHomeComp method call', fakeAsync( () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    component.navigateToLoginComp();
    tick(2000);
    fixture.detectChanges();
    expect(router.navigateByUrl).
    toHaveBeenCalledWith(router.createUrlTree(['']),
    {skipLocationChange: false});
  }));

  it('should change isSpinnerVisble to true on showSpinner method call', () => {
    component.showSpinner();
    fixture.detectChanges();
    expect(component.IsSpinnerVisible).toEqual(true);
  });

  it('should change isSpinnerVisible to false on hideSpinner method call', () => {
    component.IsSpinnerVisible = true;
    component.hideSpinner();
    fixture.detectChanges();
    expect(component.IsSpinnerVisible).toEqual(false);
  });

  it('should navigate to Login Component after Anuluj click button', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    domHelper.clickButton('Anuluj rejestrację');
    fixture.detectChanges();
    expect(router.navigateByUrl).
    toHaveBeenCalledWith(router.createUrlTree(['']),
    {skipLocationChange: false, replaceUrl: false});

  });
  describe('Zarejestruj się button', () => {

    it('should call register method after Zarejestruj się button click', () => {
    spyOn(component, 'register');
    domHelper.clickButton('Zarejestruj się');
    expect(component.register).toHaveBeenCalledTimes(1);
    });

    it('should call showSpinner method after Zarejetruj się button click', () => {
    spyOn(component, 'showSpinner');
    domHelper.clickButton('Zarejestruj się');
    expect(component.showSpinner).toHaveBeenCalledTimes(1);
    });
  });

  describe ('register method', () => {

    it('should call showSuccessMessage method after register method succeed', () => {
    spyOn(component, 'showSuccessMessage');
    component.register();
    expect(component.showSuccessMessage).toHaveBeenCalledTimes(1);
    });

    it('should call hideSpinner method after register method succeed', () => {
    spyOn(component, 'hideSpinner');
    component.register();
    expect(component.hideSpinner).toHaveBeenCalledTimes(1);
    });

    it('should call navigateToHomeComp method after register method succeed', () => {
    spyOn(component, 'navigateToLoginComp');
    component.register();
    expect(component.navigateToLoginComp).toHaveBeenCalledTimes(1);
    });

    it('should call hideSpinner method if register method throw an error', () => {
    spyOn(component, 'hideSpinner');
    authServiceMock.register.and.returnValue(throwError({error: 404}));
    component.register();
    expect(component.hideSpinner).toHaveBeenCalledTimes(1);
    });

    it('should call showFailMessage method if register method throw an error', () => {
    spyOn(component, 'showFailMessage');
    authServiceMock.register.and.returnValue(throwError({error: 404}));
    component.register();
    expect(component.showFailMessage).toHaveBeenCalledTimes(1);
    });
  });
});

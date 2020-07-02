/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DOMHelper } from '../testing/dom-helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AuthServiceMock } from '../testing/AuthServiceMock';
import { AuthService } from '../_services/auth.service';
import { of, throwError } from 'rxjs';
import { HomeComponent } from '../home/home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let domHelper: DOMHelper<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    authServiceMock.login.and.returnValue(of(''));

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, RouterTestingModule.withRoutes([
        {path: 'register', component: RegisterComponent},
        {path: 'home', component: HomeComponent}
      ]), HttpClientModule, BrowserAnimationsModule , ToastrModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title Logowanie in mat-card-title', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const title = el.querySelector('mat-card-title');
    expect(title.textContent).toContain('Logowanie');
  });

  it('should call showSpinner method on Zaloguj click button', () => {
    spyOn(component, 'showSpinner');
    domHelper.clickButton('Zaloguj');
    fixture.detectChanges();
    expect(component.showSpinner).toHaveBeenCalledTimes(1);
  });

  it('text content in Zalguj button should be equal to Zaloguj', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('.login-button')).nativeElement;
    expect(el.textContent).toEqual('Zaloguj');
  });

  it('should navigate to register Component after Rejestracja click button', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    domHelper.clickButton('Rejestracja');
    fixture.detectChanges();
    expect(router.navigateByUrl).
    toHaveBeenCalledWith(router.createUrlTree(['register']),
    {skipLocationChange: false, replaceUrl: false});
  });

  it('text content in Rejestracja button should be equal to Rejestracja', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('.register-button')).nativeElement;
    expect(el.textContent).toEqual('Rejestracja');
  });

  it('should call showSuccesMessage after login method succeed', () => {
    spyOn(component, 'showSuccessMessage');
    component.login();
    expect(component.showSuccessMessage).toHaveBeenCalledTimes(1);
  });

  it('should call navigateToHomeComp method after login method succeed', () => {
    spyOn(component, 'navigateToHomeComp');
    component.login();
    expect(component.navigateToHomeComp).toHaveBeenCalledTimes(1);
  });

  it('should call hideSpinner method after login method succeed', () => {
    spyOn(component, 'hideSpinner');
    component.login();
    expect(component.hideSpinner).toHaveBeenCalledTimes(1);
  });

  it('should call hideSpinner method after login method fail', () => {
    spyOn(component, 'hideSpinner');
    authServiceMock.login.and.returnValue(throwError({error: 404}));
    component.login();
    expect(component.hideSpinner).toHaveBeenCalledTimes(1);
  });

});

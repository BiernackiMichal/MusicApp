/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { element } from 'protractor';
import { FormsModule } from '@angular/forms';
import { MatOptionModule, MatFormFieldModule, MatSelectModule, MatToolbarModule, MatTableModule,
         MatPaginatorModule,
         MatProgressSpinner,
         MatProgressSpinnerModule,
         MatSliderModule,
         MatCardModule,
         MatDialogModule} from '@angular/material';
import { SongsLayoutComponent } from '../songsLayout/songsLayout.component';
import { MatBasicAudioPlayerComponent } from 'ngx-audio-player';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SecondsToMinutesPipe } from 'ngx-audio-player/lib/pipe/seconds-to-minutes';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../_services/auth.service';
import { AuthServiceMock } from '../testing/AuthServiceMock';
import { AddSongFormComponent } from '../addSongForm/addSongForm.component';
import { AddSetFormComponent } from '../addSetForm/addSetForm.component';
import { AdminManagePanelComponent } from '../AdminManagePanel/AdminManagePanel.component';
import { DOMHelper } from '../testing/dom-helper';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const authServiceMock = new AuthServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, MatTableModule, RouterTestingModule.withRoutes([
        {path: 'addSongForm', component: AddSongFormComponent},
        {path: 'addSetForm', component: AddSetFormComponent},
        {path: 'adminManagePanel', component: AdminManagePanelComponent}
      ]), MatDialogModule, NoopAnimationsModule],
      declarations: [ HomeComponent, SongsLayoutComponent, FaIconComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: SongsLayoutComponent}
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('title should be equal to Friendly Beat', () => {
     const title = 'Friendly Beat';
     fixture.detectChanges();
     expect(component.title).toContain(title);
  });

  it('loggedUserName should be equal to unique_name from decodedToken', () => {
    const mockedUser = authServiceMock.decodedToken.unique_name;
    expect(component.loggedUserName).toEqual(mockedUser);
  });

  it('loggedUserRole should be equal to role from decodedToken' , () => {
    const mockedUserRole = authServiceMock.decodedToken.role;
    expect(component.loggedUserRole).toEqual(mockedUserRole);
  });

  it('should call logout method after Anuluj click button ' , () => {
    spyOn(component, 'logout');
    const matOption = fixture.debugElement.query(By.css('.logout-button')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should navigate to LoginComponent after Wyloguj click button', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const matOption = fixture.debugElement.query(By.css('.logout-button')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    expect(router.navigateByUrl).
    toHaveBeenCalledWith(router.createUrlTree(['']),
    {skipLocationChange: false, replaceUrl: false});
  });

  it('should call applyFilter method on keyup', () => {
    spyOn(component, 'applyFilter');
    const event = new KeyboardEvent('keyup', {
      bubbles : true, cancelable : true, shiftKey : false
    });
    const searchElement = fixture.debugElement.query(By.css('.search')).nativeElement;
    searchElement.useValue = 'w';
    searchElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.applyFilter).toHaveBeenCalledTimes(1);
  });

  it('data returned from applyFilter method should be trimmed and lower cased', () => {
    const input = ['dataas', 'dasda' ];
    component.searchKey = 'DaTa';
    component.applyFilter(input);
    fixture.detectChanges();
    expect(component.data.filter).toEqual('data');
  });
});


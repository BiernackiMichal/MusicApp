/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SongsLayoutComponent } from './songsLayout.component';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SongsService } from '../_services/songs.service';
import { AuthService } from '../_services/auth.service';
import { of } from 'rxjs';
import { DOMHelper } from '../testing/dom-helper';

describe('SongsLayoutComponent', () => {
  let component: SongsLayoutComponent;
  let fixture: ComponentFixture<SongsLayoutComponent>;
  let authServiceMock: any;
  let domHelper: DOMHelper<SongsLayoutComponent>;
  let songsServiceMock: any;
  beforeEach(async(() => {

    authServiceMock = jasmine.createSpyObj('AuthService', ['decodedToken']);
    authServiceMock.decodedToken.and.returnValue({unique_name: 'name'});

    songsServiceMock = jasmine.createSpyObj('SongsService', ['loadAllSongs']);
    songsServiceMock.loadAllSongs.and.returnValue(of([]));


    TestBed.configureTestingModule({
      imports: [MatTableModule, FormsModule, HttpClientModule, RouterTestingModule, MatDialogModule],
      declarations: [ SongsLayoutComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: SongsService, useValue: songsServiceMock},
        {provide: AuthService, useValue: authServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsLayoutComponent);
    component = fixture.componentInstance;
    domHelper = new DOMHelper(fixture);
  });

  it('should create', () => {
     expect(component).toBeTruthy();
   });

  it('should call showSpinner method on ngOnInit', () => {
    spyOn(component, 'showSpinner');
    component.ngOnInit();
    expect(component.showSpinner).toHaveBeenCalledTimes(1);
   });

  it('should call setSongsListDepOnScreen method on ngOnInit', () => {
    spyOn(component, 'setSongsListDepOnScreen');
    component.ngOnInit();
    expect(component.setSongsListDepOnScreen).toHaveBeenCalledTimes(1);
   });

  it('should call loadAllSongs method one time on ngOnInit', () => {
    expect(songsServiceMock.loadAllSongs).toHaveBeenCalledTimes(1);
   });

  it('should call hideSpinner method after loadAllSongs method execute on ngOnInit', () => {
    spyOn(component, 'hideSpinner');
    component.ngOnInit();
    expect(component.hideSpinner).toHaveBeenCalledTimes(1);
   });
});

class SongsServiceMock {

  track: any;
  song: any = {
    title: 'a',
    artist: 'a',
    genre: 'a',
    whoAdded: 'a',
    addedDateTime: 'a'
  } ;
  model: any = {};
  songId: any = {};

  loadAllSongs() {
    return of(this.song);
  }
  getPreviousSong() {
    return of([]);
    }

    addSong() {
      return of([]);
    }


    editSong(song: any) {
      return of([]);
    }

    deleteSong(song: any) {
      return of([]);

    }

    sendSongToEdit(song) {
      return of([]);
    }
  }

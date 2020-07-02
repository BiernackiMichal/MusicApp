import { Component, OnInit, ViewChild, Pipe, Output, EventEmitter, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SongsService } from '../_services/songs.service';
import { HttpClient } from '@angular/common/http';
import {ISongs} from '../_interfaces/ISongs';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteSongConfirmationComponent } from '../deleteSongConfirmation/deleteSongConfirmation.component';
import { AuthService } from '../_services/auth.service';
import { Howl} from 'howler';
import { MatSliderChange } from '@angular/material';





@Component({
  selector: 'app-songs-layout',
  templateUrl: './songsLayout.component.html',
  styleUrls: ['./songsLayout.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SongsLayoutComponent  implements OnInit {

@ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@Output() dataFromSongsLayout = new EventEmitter <any>();


public canClickButton = true;
public currentTime = 0 || 0;
public progress = 0;
public player: Howl = null ;
public isPlaying = false;
private activeSong = null;
public songId = 1;
public song: any = ''  ;
public IsSpinnerVisible = false;
@Input() dataSource: MatTableDataSource<ISongs> ;
public displayedColumns: string[] = ['artist', 'title', 'genre', 'whoAdded', 'addedDateTime'];
public expandedElement: ISongs | null;
public searchKey: string;
public pageSizeOptions: number[] = [13];


mobileRes = '(max-width: 600px) and (max-height: 600px)';
smallTabletPortraitRes = '(min-width: 600px) and (max-width: 799px) and (orientation: portrait)';
smallTabletLandscapeRes = '(min-width: 800px) and (max-width: 1023px) and (orientation: landscape)';
tabletPortraitRes = '(min-width: 768px) and (orientation: portrait) ';
tabletLandscapeRes = '(min-width: 1024px) and (max-width: 1400px) and (orientation: landscape)';


constructor(private http: HttpClient, private songsService: SongsService, private router: Router, public dialog: MatDialog,
            public authService: AuthService) {

 this.songsService.loadAllSongs().subscribe(data => {
 this.dataSource = new MatTableDataSource(data);
 this.dataSource.paginator = this.paginator;
 this.dataSource.sort = this.sort;
});
 this.router.events.subscribe(() => {
  if (this.player) {
    this.player.stop();
  }});
}


ngOnInit() {
 this.showSpinner();
 this.setSongsListDepOnScreen();
 this.songsService.loadAllSongs().subscribe(data => {
 this.hideSpinner();
 this.dataSource = new MatTableDataSource(data);
 this.song = data[0];
 this.player = new Howl({
  src: [this.song.urlToPlay],
  onplay: () => {
   this.player.duration();
   this.isPlaying = true;
   this.activeSong = this.song;
   this.updateProgress();
  },
  onend: () => {
    this.next();
  },
  html5: true,
  format: ['mp3']
  });
 this.dataFromSongsLayout.emit(this.dataSource);
 this.dataSource.paginator = this.paginator;
 this.dataSource.sort = this.sort;
 });
}

start(song) {
  this.song = song;
  this.songId = song.id;
  if (this.player) {
    this.player.stop();
    }
  this.player = new Howl({
    src: [this.song.urlToPlay],
    onplay: () => {
     this.player.duration();
     this.isPlaying = true;
     this.activeSong = song;
     this.updateProgress();
    },
    onend: () => {
      this.next();
    },
    html5: true,
    format: ['mp3']
    });
  this.player.stop();
  this.player.play();
}

next() {
  this.disableButton();
  this.isPlaying = false;
  return this.songsService.getNextSong(this.songId ).subscribe(data => {
  this.currentTime = 0;
  this.start(data);
  });
}

previous() {
  this.disableButton();
  this.isPlaying = false;
  this.songsService.getPreviousSong(this.songId ).subscribe(data => {
  this.start(data);
  });

}
togglePlayer(pause) {
  this.isPlaying = !pause;
  if (pause) {
    this.player.pause();
  } else {
    this.player.play();
  }
}

seek(event: MatSliderChange ) {
if (event) {
const newValue = +this.progress;
const duration = this.player.duration();
this.player.seek(duration * (newValue / 100));
}
}

updateProgress() {
  setTimeout(() => {
  const seek = this.player.seek();
  this.progress = (seek / this.player.duration()) * 100 || 0;
  this.updateProgress();
  this.currentTime = this.player.seek();
  }, 1000);
}

private disableButton() {
  this.canClickButton = false;
  setTimeout(() => { this.canClickButton = true; }, 1200);
}

downloadSong(song) {
  const url = song.urlToDownload;
  const win = window.open(url, '_blank');
  win.opener = null;
  win.focus();
}

editSong(song) {
  this.songsService.sendSongToEdit(song);
  this.navigateToEditComp();
}

deleteSongConfirmation(song) {
  this.songsService.songId = song;
  this.dialog.open(DeleteSongConfirmationComponent);
}

navigateToEditComp() {
  setTimeout(() => { this.router.navigate([ '/editSongForm']) ; }, );
 }

setSongsListDepOnScreen() {
  if (window.matchMedia(this.mobileRes).matches) {
  this.pageSizeOptions = [10];
  }
  if (window.matchMedia(this.smallTabletPortraitRes).matches) {
    this.pageSizeOptions = [10];
    }
  if (window.matchMedia(this.smallTabletLandscapeRes).matches) {
      this.pageSizeOptions = [6];
      }
  if (window.matchMedia(this.tabletLandscapeRes).matches) {
      this.pageSizeOptions = [9];
       }
  if (window.matchMedia(this.tabletPortraitRes).matches) {
        this.pageSizeOptions = [14];
        }
}

showSpinner() {
  this.IsSpinnerVisible = true;
}

hideSpinner() {
  this.IsSpinnerVisible = false;
}

}


import { Component, OnInit, ViewChild, Pipe, Output, EventEmitter, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SetsService } from '../_services/sets.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteSongConfirmationComponent } from '../deleteSongConfirmation/deleteSongConfirmation.component';
import { AuthService } from '../_services/auth.service';
import { ISets } from '../_interfaces/ISets';
import { SongsService } from '../_services/songs.service';
import { DeleteSetConfirmationComponent } from '../deleteSetConfirmation/deleteSetConfirmation.component';
import { Howl} from 'howler';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-setslayout',
  templateUrl: './setsLayout.component.html',
  styleUrls: ['./setsLayout.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SetsLayoutComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() dataFromSongsLayout = new EventEmitter <any>();

  currentTime = 0 || 0;
  progress = 0;
  player: Howl = null;
  isPlaying = false;
  activeSet = null;
  setId = 1;
  set: any = ''  ;
  IsSpinnerVisible = false;
  data: any;
  model: any = {};
  baseUrl = 'http://localhost:5000/api/Sets/';
  @Input() dataSource: MatTableDataSource<ISets> ;
  displayedColumns: string[] = ['artist', 'title', 'whoAdded', 'addedDateTime'];
  expandedElement: ISets | null;
  searchKey: string;
  pageSizeOptions: number[] = [13];

  mobileRes = '(max-width: 600px) and (max-height: 600px)';
  smallTabletPortraitRes = '(min-width: 600px) and (max-width: 799px) and (orientation: portrait)';
  smallTabletLandscapeRes = '(min-width: 800px) and (max-width: 1023px) and (orientation: landscape)';
  tabletPortraitRes = '(min-width: 768px) and (orientation: portrait) ';
  tabletLandscapeRes = '(min-width: 1024px) and (max-width: 1400px) and (orientation: landscape)';


  constructor(private http: HttpClient, private setsService: SetsService, private router: Router, public dialog: MatDialog,
              public authService: AuthService, private songsService: SongsService) {


    this.setsService.loadAllSets().subscribe(data => {
   this.dataSource = new MatTableDataSource(data);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  });
    this.router.events.subscribe(() => {
      if (this.player) {
        this.player.stop();
      }
    }
    );
  }




  ngOnInit() {
   this.showSpinner();
   this.SetSetsListDepOnScreen();
   this.setsService.loadAllSets().subscribe(data => {
   this.hideSpinner();
   this.dataSource = new MatTableDataSource(data);
   this.dataFromSongsLayout.emit(this.dataSource);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   });
  }

  start(set) {
    this.set = set;
    this.setId = set.id;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [set.urlToPlay],
      onplay: () => {
       this.player.duration();
       this.isPlaying = true;
       this.activeSet = set;
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
    return this.setsService.getNextSet(this.setId ).subscribe(data => {
      console.log(data);
      this.start(data);
    });
  }
  previous() {
    return this.setsService.getPreviousSet(this.setId ).subscribe(data => {
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

  seek(event: MatSliderChange) {
  const newValue = +this.progress;
  const duration = this.player.duration();
  this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
      this.currentTime = this.player.seek();

    }, 1000);
  }


  downloadSong(model) {
    const url = model.urlToDownload;
    const win = window.open(url, '_blank');
    win.opener = null;
    win.focus();
  }

  editSet(set) {
  this.setsService.sendSetToEdit(set);
  this.navigateToEditComp();
  }



  deleteSetConfirmation(set) {
  this.setsService.SetIdToDelete = set;
  this.dialog.open(DeleteSetConfirmationComponent);
  }

  navigateToEditComp() {
    setTimeout(() => { this.router.navigate([ '/editSetForm']) ; }, );
   }

  SetSetsListDepOnScreen() {
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
   logout() {
    this.authService.logout();
  }

  applyFilter(data: string) {
  data === undefined ? ' ' :
  this.data = data;
  this.data.filter = this.searchKey.trim().toLowerCase();
  }

  showSpinner() {
    this.IsSpinnerVisible = true;
  }
  hideSpinner() {
    this.IsSpinnerVisible = false;
  }

}

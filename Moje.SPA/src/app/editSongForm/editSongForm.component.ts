import { Component, OnInit } from '@angular/core';
import { SongsService } from '../_services/songs.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editsongform',
  templateUrl: './editSongForm.component.html',
  styleUrls: ['./editSongForm.component.css']
})
export class EditSongFormComponent implements OnInit {

  constructor(private songsService: SongsService, private router: Router, private toastr: ToastrService  ) { }

  song: any = {} ;
  genres: string[] = [
    'Fidget-House', 'Electro-House', 'Jackin-House', 'Inne'
    ] ;
    editSong() {
      this.songsService.editSong(this.song).subscribe (
        next => {this.showSuccessMessage();
                 this.navigateToHomeComp(); },
        error => {console.log(error);
                  this.showFailMessage(); }
      );
    }



  ngOnInit() {
   this.song = this.songsService.song;
   console.log(this.songsService.song);
  }

  navigateToHomeComp() {
    setTimeout(() => { this.router.navigate([ '/home']) ; }, 1500);
   }

   showSuccessMessage() {
    this.toastr.success('Edycja utworu udana.');
   }
   showFailMessage() {
    this.toastr.error('Edycja utworu nie udana');
   }
}

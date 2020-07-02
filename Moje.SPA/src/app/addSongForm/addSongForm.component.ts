import { Component, OnInit } from '@angular/core';
import { SongsService } from '../_services/songs.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-addsongform',
  templateUrl: './addSongForm.component.html',
  styleUrls: ['./addSongForm.component.css']
})
export class AddSongFormComponent  {

  constructor(private songsService: SongsService, private authService: AuthService,
              private router: Router, private toastr: ToastrService) { }

  genres: string[] = [
    'Fidget-House', 'Electro-House', 'Jackin-House', 'Inne', 'Bass-House', 'Future-House', 'Retro', 'House', 'Deep-House'
    ] ;

  model: any = {};
  currentDate = new Date().toLocaleString();



  addSong() {
    this.addedSongDateTime();
    this.whoIsAddingSong();
    this.songsService.addSong(this.model).subscribe(
     next  => {
     this.showSuccessMessage();
     this.navigateToHomeComp();
   },
     error => {console.log(error); },
    );
    }



 navigateToHomeComp() {
  setTimeout(() => { this.router.navigate([ '/home']) ; }, 1500);
 }

 showSuccessMessage() {
  this.toastr.success('Pomyślnie dodano utwór');
 }

whoIsAddingSong() {
 this.model.WhoAdded = this.authService.decodedToken.unique_name;
}

addedSongDateTime() {
  this.model.AddedDateTime = this.currentDate;
}

}

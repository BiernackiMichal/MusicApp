import { Component, OnInit, Inject } from '@angular/core';
import { SongsService } from '../_services/songs.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { error } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deletesongconfirmation',
  templateUrl: './deleteSongConfirmation.component.html',
  styleUrls: ['./deleteSongConfirmation.component.css']
})
export class DeleteSongConfirmationComponent implements OnInit {

  constructor(private songsService: SongsService) { }

  songId = this.songsService.songId;

  ngOnInit() {
  }

  deleteSong() {
    this.songsService.deleteSong(this.songId).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }


}

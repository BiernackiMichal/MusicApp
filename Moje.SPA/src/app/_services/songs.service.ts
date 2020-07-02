import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ISongs } from '../_interfaces/ISongs';
import { map, share } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class SongsService {

constructor(private http: HttpClient) { }



track: Observable<any>;
song: any = {} ;
model: any = {};
songId: any = {};
// baseUrl = 'http://friendlybeat-001-site1.gtempurl.com/api/Songs/';
baseUrl = 'http://localhost:5000/api/Songs/';

getNextSong(song: any) {
return this.http.get(this.baseUrl + 'GetNextSong/' + song);
}

getPreviousSong(song: any) {
return this.http.get(this.baseUrl + 'GetPreviousSong/' + song);
}

addSong(model: any) {
return this.http.post(this.baseUrl + 'addSong', model);
}

loadAllSongs(): Observable<ISongs[]> {
 return this.http.get<ISongs[]>(this.baseUrl);
}


editSong(song: any) {
return this.http.put(this.baseUrl  + song.id, song);
}

deleteSong(song: any) {
  return this.http.delete(this.baseUrl + song.id);

}

sendSongToEdit(song) {
this.song =  song;
}



}

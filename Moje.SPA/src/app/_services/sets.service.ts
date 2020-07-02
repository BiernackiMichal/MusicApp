import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISets } from '../_interfaces/ISets';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  constructor(private http: HttpClient) { }


private setResource = new BehaviorSubject<any>(null);
currentSet = this.setResource.asObservable();

set: any = {};
model: any = {};
SetIdToDelete: any = {};
// baseUrl = 'http://friendlybeat-001-site1.gtempurl.com/api/Sets/';
baseUrl = ' http://localhost:5000/api/Sets/';


getNextSet(set: any) {
return this.http.get(this.baseUrl + 'GetNextSet/' + set);
}

getPreviousSet(set: any) {
return this.http.get(this.baseUrl + 'GetPreviousSet/' + set);
}

addSet(model: any) {
return this.http.post(this.baseUrl + 'addSet', model);
}

loadAllSets(): Observable<ISets[]> {
return this.http.get<ISets[]>(this.baseUrl);
}

changeSong(set: any) {
this.setResource.next(set);
}

editSet(set: any) {
return this.http.put(this.baseUrl  + set.id, set);
}

deleteSet(set: any) {
return this.http.delete(this.baseUrl + set.id);
}

sendSetToEdit(set) {
this.set =  set;
}

}

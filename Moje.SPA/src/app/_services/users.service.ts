import { Injectable } from '@angular/core';
import { IUsers } from '../_interfaces/IUsers';
import { Observable } from 'rxjs';
import {HttpClient } from '@angular/common/http';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor( private http: HttpClient) { }
// baseUrl = 'http://friendlybeat-001-site1.gtempurl.com/api/Users/';
 baseUrl = 'http://localhost:5000/api/Users/';
user: any = {
  userRole: '',
};
UserIdToDelete: any = {};


getAllUsers(): Observable<IUsers[]> {
  return this.http.get<IUsers[]>(this.baseUrl);
 }

editUser(user: any) {
  return this.http.put<IUsers>(this.baseUrl + user.id, user);
}
deleteUser(user: any) {
  return this.http.delete<IUsers>(this.baseUrl + user.id);
}
sendUserToEdit(user) {
  this.user = user;
}
}

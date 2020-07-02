import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators' ;
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(private http: HttpClient) { }

 // baseUrl = 'http://friendlybeat-001-site1.gtempurl.com/api/auth/';
 baseUrl = 'http://localhost:5000/api/auth/';
 jwtHelper = new JwtHelperService();
 decodedToken: any = {
  role: 'Role',
  unique_name: 'name'
 };


 login(model: any) {
   return this.http.post(this.baseUrl + 'login', model)
    .pipe(map((response: any) => {
     const user =  response;
     if (user) {

      localStorage.setItem('token', user.token);
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
     }
    }));
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return!!token;
  }
  logout() {
    localStorage.removeItem('token');

  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model)
    .pipe(map((response: any) => {
      const user =  response;
      if (user) {
       localStorage.setItem('token', user.token);
       this.decodedToken = this.jwtHelper.decodeToken(user.token);
  }
 }));
}
}

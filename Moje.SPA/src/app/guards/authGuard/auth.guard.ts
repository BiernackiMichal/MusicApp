import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router) {}

  CurrentUser = '';

canActivate(next: ActivatedRouteSnapshot): boolean {

  if (this.authService.loggedIn()) {
    this.CurrentUser = this.authService.decodedToken.role;
  }  else {
    this.router.navigate(['']);
  }
  if (next.data.roles.includes(this.CurrentUser)) {
      return true;
    } else {
    this.router.navigate(['']);
    return false;
  }
}

}

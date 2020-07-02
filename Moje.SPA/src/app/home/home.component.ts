import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SongsLayoutComponent } from '../songsLayout/songsLayout.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SongsLayoutComponent),
      multi: true
    }
]
})
export class HomeComponent {


constructor(public authService: AuthService) {}

loggedUserName = this.authService.decodedToken.unique_name;
loggedUserRole = this.authService.decodedToken.role;

title = 'Friendly Beat';
data: any;
searchKey = '';


logout() {
 this.authService.logout();
}

applyFilter(data: any) {
// tslint:disable-next-line: no-unused-expression
data === undefined ? ' ' :
this.data = data;
this.data.filter = this.searchKey.trim().toLowerCase();
}

}

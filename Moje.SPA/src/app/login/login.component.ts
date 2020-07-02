import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterEvent, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  IsSpinnerVisible = false;
  model: any = {};
 constructor( private router: Router, private  authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {}

login() {
  this.authService.login(this.model).subscribe(
    next =>  {this.showSuccessMessage(),
              this.navigateToHomeComp();
              this.hideSpinner(); },

    error => {this.toastr.error('Pisanie jest trudne, spróbuj jeszcze raz.'),
              this.hideSpinner(); }
   );
}
showSuccessMessage() {
  this.toastr.success('Zalogowano');

 }
 navigateToHomeComp() {
  setTimeout(() => { this.router.navigate([ '/home']) ; }, 1500);
 }

 showSpinner() {
  this.IsSpinnerVisible = true;
}

 hideSpinner() {
  this.IsSpinnerVisible = false;
 }
}

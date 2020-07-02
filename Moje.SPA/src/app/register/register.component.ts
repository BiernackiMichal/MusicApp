import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  model: any = {};
  IsSpinnerVisible = false;


  register() {
    this.authService.register(this.model).subscribe(() => {
      this.showSuccessMessage();
      this.navigateToLoginComp();
      this.hideSpinner();

    }, error => {
      this.showFailMessage();
      this.hideSpinner();
    }) ;
 }
 navigateToLoginComp() {
  setTimeout(() => { this.router.navigate(['']) ; }, 1500);
 }
 showSuccessMessage() {
  this.toastr.success('Rejestracja udana');
 }
 showFailMessage() {
  this.toastr.error('Rejestracja nie powiodła się.');
}

showSpinner() {
  this.IsSpinnerVisible = true;
}
hideSpinner() {
  this.IsSpinnerVisible = false;
}
}

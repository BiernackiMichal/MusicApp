import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './EditUserForm.component.html',
  styleUrls: ['./EditUserForm.component.css']
})
export class EditUserFormComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private toastr: ToastrService) { }
  user: any = {
    userRole: '',
  };

 roles: string[] = ['Administrator', 'Moderator', 'User' ];



  ngOnInit() {
    this.user = this.usersService.user;
  }


   editUser() {
    this.usersService.editUser(this.user).subscribe (
      next =>  {this.showSuccessMessage();
                this.navigateToAdminManagePanelComp(); },

      error => {console.log(error);
                this.showFailMessage(); }
    );
  }
  navigateToAdminManagePanelComp() {
    setTimeout(() => { this.router.navigate([ '/adminManagePanel']) ; }, 1500);
   }

   showSuccessMessage() {
    this.toastr.success('Edycja użytkownika udana.');
   }

   showFailMessage() {
     this.toastr.error('Edycja użytkownika nie udana');
   }
}

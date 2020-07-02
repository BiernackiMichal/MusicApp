import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog,  } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../_services/users.service';
import { IUsers } from '../_interfaces/IUsers';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { DeleteUserConfirmationComponent } from '../deleteUserConfirmation/deleteUserConfirmation.component';

@Component({
  selector: 'app-adminmanagepanel',
  templateUrl: './AdminManagePanel.component.html',
  styleUrls: ['./AdminManagePanel.component.css']
})
export class AdminManagePanelComponent implements OnInit {

  constructor(private http: HttpClient, private usersService: UsersService, private router: Router, public authService: AuthService,
              public dialog: MatDialog) { }




  displayedColumns: string[] = ['Id', 'username', 'userRole'];


  dataSource: MatTableDataSource<IUsers>;
  ngOnInit() {
    this.usersService.getAllUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUserConfirmation(user) {
    this.usersService.UserIdToDelete = user;
    this.dialog.open(DeleteUserConfirmationComponent);
    }

editUser(user) {
  this.usersService.sendUserToEdit(user);
  this.navigateToEditUserForm();
  }

  navigateToEditUserForm() {
    setTimeout(() => { this.router.navigate([ '/editUserForm']) ; }, );
   }

   logout() {
    this.authService.logout();
  }

}


import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-deleteuserconfirmation',
  templateUrl: './deleteUserConfirmation.component.html',
  styleUrls: ['./deleteUserConfirmation.component.css']
})
export class DeleteUserConfirmationComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  UserId = this.usersService.UserIdToDelete;
  ngOnInit() {
  }

  deleteUser() {
    this.usersService.deleteUser(this.UserId).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }
}

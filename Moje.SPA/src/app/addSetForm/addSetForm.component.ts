import { Component, OnInit } from '@angular/core';
import { SetsService } from '../_services/sets.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsetform',
  templateUrl: './addSetForm.component.html',
  styleUrls: ['./addSetForm.component.css']
})
export class AddSetFormComponent  {

  constructor(private setsService: SetsService, private authService: AuthService,
              private router: Router, private toastr: ToastrService) { }



set: any = {};
currentDate = new Date().toLocaleString();


addSet() {
  this.addedSetDateTime();
  this.whoIsAddingSet();
  this.setsService.addSet(this.set).subscribe(
  next  => {this.showSuccessMessage();
            this.navigateToHomeComp();
          },

  error => {this.showFailMessage(); });
}

navigateToHomeComp() {
this.router.navigate([ '/home']) ;
}

showSuccessMessage() {
this.toastr.success('Pomyślnie dodano set');
}

showFailMessage() {
  this.toastr.error('Nie udało się dodać seta');
}


whoIsAddingSet() {
this.set.WhoAdded = this.authService.decodedToken.unique_name;
}

addedSetDateTime() {
this.set.AddedDateTime = this.currentDate;
}

}

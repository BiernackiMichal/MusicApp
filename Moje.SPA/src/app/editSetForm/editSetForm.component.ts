import { Component, OnInit } from '@angular/core';
import { SetsService } from '../_services/sets.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editsetform',
  templateUrl: './editSetForm.component.html',
  styleUrls: ['./editSetForm.component.css']
})
export class EditSetFormComponent implements OnInit {
  constructor(private setsService: SetsService , private router: Router, private toastr: ToastrService  ) { }

  set: any = {} ;
    editSet() {
      this.setsService.editSet(this.set).subscribe (
        next => {this.showSuccessMessage();
                 this.navigateToHomeComp(); },
        error => {console.log(error);
                  this.showFailMessage(); }
      );
    }



  ngOnInit() {
this.set = this.setsService.set;
console.log(this.setsService.set);
  }

  navigateToHomeComp() {
    setTimeout(() => { this.router.navigate([ '/home']) ; }, 1500);
   }

   showSuccessMessage() {
    this.toastr.success('Edycja seta udana.');
   }
   showFailMessage() {
     this.toastr.error('Edycja seta nie udana');
   }
}

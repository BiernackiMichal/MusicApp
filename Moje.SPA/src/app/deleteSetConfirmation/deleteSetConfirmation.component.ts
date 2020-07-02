import { Component, OnInit } from '@angular/core';
import { SetsService } from '../_services/sets.service';

@Component({
  selector: 'app-deleteSetConfirmation',
  templateUrl: './deleteSetConfirmation.component.html',
  styleUrls: ['./deleteSetConfirmation.component.css']
})
export class DeleteSetConfirmationComponent implements OnInit {

  constructor(private setsService: SetsService) { }

  setId = this.setsService.SetIdToDelete;

  ngOnInit() {
  }

  deleteSet() {
    this.setsService.deleteSet(this.setId).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';

@Component({
  selector: 'app-add-instructor-modal',
  templateUrl: './add-instructor-modal.component.html',
  styleUrls: ['./add-instructor-modal.component.css']
})
export class AddInstructorModalComponent implements OnInit {

  branches: any = [];
  constructor(private instService: InstitutionService) { }

  ngOnInit() {
    this.instService.getInstitutionBranches(1)
          .subscribe(data => {
            this.branches = data
            console.log("got data", data);
          })
  }

}

import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { AddInstructorModalComponent } from 'src/app/institutions/components/add-instructor-modal/add-instructor-modal.component';
import { InstructorTabComponent } from 'src/app/institutions/components/instructor-tab/instructor-tab.component';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: any = []
  branchData: any = [];

  constructor(private api : InstitutionService
    ,private matDialogue: MatDialog) { }

  ngOnInit() {

    this.api.getInstitutionBranches(localStorage.getItem('loggedInTenantId'))
    .subscribe(data => {
      console.log("branch", data);
      this.branchData = data;
    })

    this.api.getAllInstructors(localStorage.getItem('loggedInTenantId'))
    .subscribe((response: any) => {
      console.log("instructors", response);

      this.instructors = response;
    }) 
  }
  openModal(){
    this.matDialogue.open(InstructorTabComponent, {
      width: '550px',
      height: '400px',
     
    })
 }

 add() {
  this.matDialogue.open(AddInstructorModalComponent, {
    width: '800px',
    height: '500px',
    data: this.branchData
  })
}

}
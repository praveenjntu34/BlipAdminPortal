import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { AddInstructorModalComponent } from 'src/app/institutions/components/add-instructor-modal/add-instructor-modal.component';
import { InstructorTabComponent } from 'src/app/institutions/components/instructor-tab/instructor-tab.component';
import { EditInstructorModalComponent } from '../modals/edit-instructor-modal/edit-instructor-modal.component';
import { DeleteInstructorModalComponent } from '../modals/delete-instructor-modal/delete-instructor-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: any = []
  branchData: any = [];
  private subscriptions: Subscription[] =[];

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

    this.updateInstructors();
  }

  openEditModal(){
    this.matDialogue.open(EditInstructorModalComponent, {
      width: '550px',
      height: '400px',
    })
 }
openDeleteModal(){
    this.matDialogue.open(DeleteInstructorModalComponent, {
      width: '550px',
      height: '290px',
    })
 }

 add() {
  this.matDialogue.open(AddInstructorModalComponent, {
    width: '800px',
    height: '500px',
    data: this.branchData
  })
}

 private updateInstructors() {
  this.subscriptions.push(this.api.instructorUpdateList
    .subscribe(isUpdated => {
      if(isUpdated) {
        const newDataToAdd = this.api.getNewIInstructorData();
        this.api.resetNewInstructorData();

        if(newDataToAdd != null) {
          this.instructors.push(newDataToAdd);
        }
      }
    })
    )
 }

}

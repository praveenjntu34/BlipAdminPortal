import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { AddInstructorModalComponent } from 'src/app/institutions/components/add-instructor-modal/add-instructor-modal.component';
import { InstructorTabComponent } from 'src/app/institutions/components/instructor-tab/instructor-tab.component';
import { EditInstructorModalComponent } from '../modals/edit-instructor-modal/edit-instructor-modal.component';
import { DeleteInstructorModalComponent } from '../modals/delete-instructor-modal/delete-instructor-modal.component';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: any = []
  branchData: any = [];
  private subscriptions: Subscription[] =[];

  pageArray: Array<number>;
  selectedPage: number = 1;
  currentIndex: number = 1;

  constructor(private api : InstitutionService
    ,private matDialogue: MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    
    this.ngxService.start();
    this.api.getInstitutionBranches(localStorage.getItem('loggedInTenantId'))
    .subscribe(data => {
      console.log("branch", data);
      this.branchData = data;
    })

    this.api.getAllInstructors(localStorage.getItem('loggedInTenantId'),0)
    .subscribe((response: any) => {
      console.log("instructors", response);
      this.pageArray = new Array(Math.ceil(response.pages))
      this.ngxService.stop();
      this.instructors = response.instructors;
    }) 

    this.updateInstructors();
  }

  openEditModal(index){
    this.matDialogue.open(EditInstructorModalComponent, {
      width: '550px',
      height: '500px',
      data: {
        instructors: this.instructors[index],
        branches: this.branchData
      }
    })
 }
openDeleteModal(index){
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

getCurrentPage(pageNo: number) {
  this.ngxService.start();
  console.log("default config");
  
  this.selectedPage = pageNo;
  this.api.getAllInstructors(localStorage.getItem('loggedInTenantId'),pageNo - 1)
    .subscribe((response: any) => {
      console.log("instructors", response);
      this.ngxService.stop();
      this.instructors = response.instructors;
    }) 
}

deleteInstructor(index) {
  console.log(this.instructors[index].instructorId);
  this.ngxService.start()
  
  this.api.deleteInstructor(this.instructors[index].instructorId)
        .subscribe(data => {
          this.ngxService.stop();
          window.location.reload();
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

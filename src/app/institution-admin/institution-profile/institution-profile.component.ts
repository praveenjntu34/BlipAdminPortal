import { Component, OnInit, Input } from '@angular/core';
import { BSections } from 'src/app/institutions/components/institution-list/institution-list.component';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { EditInstitutionDetailsComponent } from 'src/app/institutions/components/edit-institution-details/edit-institution-details.component';
import { EditInstitutionPocDetailsComponent } from 'src/app/institutions/components/edit-institution-poc-details/edit-institution-poc-details.component';
import { InstructorTabComponent } from 'src/app/institutions/components/instructor-tab/instructor-tab.component';
import { AddInstructorModalComponent } from 'src/app/institutions/components/add-instructor-modal/add-instructor-modal.component';

@Component({
  selector: 'app-institution-profile',
  templateUrl: './institution-profile.component.html',
  styleUrls: ['./institution-profile.component.css']
})
export class InstitutionProfileComponent implements OnInit {

  selectedBranchIndex: number = -1;
  bSectionsArray: Array<BSections> = new Array<BSections>();
  singleSection: Array<string> = [];

  instructors: any = []

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

 

   
  }

 myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  pocData: any;
  image: any
  @Input() data: any;
  branchData: any = [];
  coreData: any;
  constructor(private route: ActivatedRoute, private api : InstitutionService
    ,private matDialogue: MatDialog
    ) {
    this.route.params.subscribe((param:any) => {
      console.log("route param", param);
      console.log("d", this.data);
    })
   }

   public getBranch(i) {
    console.log("got index", i)
    this.selectedBranchIndex = i;
    this.singleSection = this.branchData[this.selectedBranchIndex].sections;
  }
  
  editInstitutionForm(){
    console.log("this", this.coreData)
    this.matDialogue.open(EditInstitutionDetailsComponent, {
      width: '1300px',
      height: '700px',
      panelClass: 'custom-dialog-container',
      data: this.coreData
    });
  }

  editPOCForm(){
    console.log("this", this.pocData)
    this.matDialogue.open(EditInstitutionPocDetailsComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container',
      data: this.pocData
    });
  }

  getRandomColor() {
    return {
      'border-color': this.myArray[Math.floor(Math.random() * this.myArray.length)]
    }
  }
  ngOnInit() {
    this.api.getInstitutionDetails(localStorage.getItem('loggedInTenantId'))
    .subscribe((data: any) => {
      let objectURL = 'data:image/jpeg;base64,' + data.pictureStream;      
      data.pictureStream = objectURL;
      this.coreData = data;
      console.log("returned", data);
      
    })

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
this.api.getPOCDetails(localStorage.getItem('loggedInTenantId'))
.subscribe(res => {
this.pocData = res;

console.log("res", res)
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

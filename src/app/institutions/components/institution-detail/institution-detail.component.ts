import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../shared/institution.service';
import { BSections } from '../institution-list/institution-list.component';
import { MatDialog } from '@angular/material/dialog';
import { InstructorTabComponent } from '../instructor-tab/instructor-tab.component';
import { AddInstructorModalComponent } from '../add-instructor-modal/add-instructor-modal.component';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit, OnChanges {
  selectedBranchIndex: number = -1;
  bSectionsArray: Array<BSections> = new Array<BSections>();
  singleSection: Array<string> = [];

  instructors: any = []

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {


    this.api.getInstitutionBranches(this.coreData.relTenantInstitutionId)
              .subscribe(data => {
                console.log("branch", data);
                this.branchData = data;
              })
          
    this.api.getAllInstructors(this.coreData.relTenantInstitutionId)
              .subscribe((response: any) => {
                console.log("instructors", response);

                this.instructors = response;
              })          
    this.api.getPOCDetails(this.coreData.relTenantInstitutionId)
    .subscribe(res => {
      this.pocData = res;

      console.log("res", res)
    })
  }

 myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  pocData: any;
  image: any
  @Input() data: any;
  branchData: any = [];
  @Input() coreData: any;
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
  
  getRandomColor() {
    return {
      'border-color': this.myArray[Math.floor(Math.random() * this.myArray.length)]
    }
  }
  ngOnInit() {
    
  }

  openModal(){
     this.matDialogue.open(InstructorTabComponent, {
       width: '550px',
       height: '400px'
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

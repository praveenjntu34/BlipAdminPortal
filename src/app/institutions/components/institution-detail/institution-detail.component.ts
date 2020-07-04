import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../shared/institution.service';
import { BSections } from '../institution-list/institution-list.component';
import { MatDialog } from '@angular/material/dialog';
import { InstructorTabComponent } from '../instructor-tab/instructor-tab.component';
import { AddInstructorModalComponent } from '../add-instructor-modal/add-instructor-modal.component';
import { AddInstitutionModalComponent } from '../add-institution-modal/add-institution-modal.component';
import { EditInstitutionDetailsComponent } from '../edit-institution-details/edit-institution-details.component';
import { EditInstitutionPocDetailsComponent } from '../edit-institution-poc-details/edit-institution-poc-details.component';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import * as _ from 'lodash';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit, OnChanges {
  selectedBranchIndex: number = -1;
  bSectionsArray: Array<BSections> = new Array<BSections>();
  singleSection: Array<string> = [];

  modalOptions:NgbModalOptions;
  modalRef: NgbModalRef;
  branchNameModel: string;
  sectionNameModel: string;

  deletedBranchIndex: number;
  instructors: any = []

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    console.log("core",this.coreData);

    this.api.getInstitutionBranches(this.coreData.relTenantInstitutionId)
              .subscribe(data => {
                console.log("branches", data);
                this.branchData = data;
              })
          
    this.api.getAllInstructors(this.coreData.relTenantInstitutionId,0)
              .subscribe((response: any) => {
                console.log("instructors", response);

                this.instructors = response.instructors;
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
    ,private matDialogue: MatDialog,private instService: InstitutionService,private ngxService: NgxUiLoaderService, private modalService: NgbModal
    ) {

      this.modalOptions = {
        backdrop: 'static',
        centered: true,
        backdropClass:'customBackdrop',
        size: 'sm',
        windowClass: 'custom-class'
      }
    this.route.params.subscribe((param:any) => {
      console.log("route param", param);
      console.log("d", this.data);
    })
   }



  addBranch() {

    this.modalRef.close();
    var branch = {
      branchName: this.branchNameModel,
      relTenantInstitutionId: this.coreData.relTenantInstitutionId
    }
    this.instService.addBranch(branch)
    .subscribe((data: any) => {
          this.branchData.push(branch)
          this.branchNameModel = null;
          console.log(data);
          window.location.reload();
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
      width: '800px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: this.coreData
    });
  }

  openBranchModal(modalContent) {
    this.modalRef = this.modalService.open(modalContent, this.modalOptions)
    
  }

  editPOCForm(){
    console.log("this", this.pocData)
    this.matDialogue.open(EditInstitutionPocDetailsComponent, {
      width: '800px',
      height: '500px',
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
    
  }

  openModal(index){
     this.matDialogue.open(InstructorTabComponent, {
       width: '550px',
       height: '400px',
       data: this.instructors[index]
      
     })
  }

  openSectionModal(sectionContent) {
    this.modalRef = this.modalService.open(sectionContent, this.modalOptions)
  }

  addSection(){
    var obj:any = {
      sectionName: this.sectionNameModel
    }
    console.log("s", this.singleSection);
    
    this.singleSection.push(obj)

    console.log("ss", this.singleSection);

    var sectionRequestData = {
      branchId: this.branchData[this.selectedBranchIndex].branchId,
      sectionName: this.sectionNameModel
    }

    this.instService.addSection(sectionRequestData)
          .subscribe((data: any) => {
            // window.location.reload();
            this.modalRef.close();

            this.sectionNameModel = null;
            console.log(data)
          })

  }

  deleteWarn(deleteContent, branchIndex){
    this.modalRef = this.modalService.open(deleteContent, this.modalOptions)
    this.deletedBranchIndex = this.branchData[branchIndex].branchId;
    console.log("Branch deleted", this.branchData[branchIndex]);
  }

  deleteBranch(){
    this.ngxService.start();
    var that = this;
    this.instService.deleteBranch(this.deletedBranchIndex)
          .subscribe(data => {
            console.log(data);
            this.ngxService.stop();
            this.modalRef.close();
            window.location.reload();
            
          })
    console.log("Branch deleted");
  }
  add() {
    this.matDialogue.open(AddInstructorModalComponent, {
      width: '800px',
      height: '500px',
      data: this.branchData
    })
  }

}

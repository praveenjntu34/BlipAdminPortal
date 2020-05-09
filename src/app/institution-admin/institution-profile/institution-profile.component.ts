import { Component, OnInit, Input } from '@angular/core';
import { BSections } from 'src/app/institutions/components/institution-list/institution-list.component';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { EditInstitutionDetailsComponent } from 'src/app/institutions/components/edit-institution-details/edit-institution-details.component';
import { EditInstitutionPocDetailsComponent } from 'src/app/institutions/components/edit-institution-poc-details/edit-institution-poc-details.component';
import { InstructorTabComponent } from 'src/app/institutions/components/instructor-tab/instructor-tab.component';
import { AddInstructorModalComponent } from 'src/app/institutions/components/add-instructor-modal/add-instructor-modal.component';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-institution-profile',
  templateUrl: './institution-profile.component.html',
  styleUrls: ['./institution-profile.component.css']
})
export class InstitutionProfileComponent implements OnInit {

  selectedBranchIndex: number = -1;
  bSectionsArray: Array<BSections> = new Array<BSections>();
  singleSection: Array<string> = [];
  modalOptions:NgbModalOptions;
  instructors: any = []
  modalRef: NgbModalRef;
  branchNameModel: string;
  sectionNameModel: string;

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
   
  }

 myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  pocData: any;
  image: any
  @Input() data: any;
  branchData: any = [];
  coreData: any;
  
  constructor(private route: ActivatedRoute, private api : InstitutionService
    ,private matDialogue: MatDialog, private modalService: NgbModal,private instService: InstitutionService
    ) {
      this.modalOptions = {
        backdrop: 'static',
        centered: true,
        backdropClass:'customBackdrop',
        size: 'sm',
        windowClass: 'modal-container'
      }

    this.route.params.subscribe((param:any) => {
      console.log("route param", param);
      console.log("d", this.data);
    })
   }

   public getBranch(i) {
    console.log("got index", this.branchData[i])
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

  openBranchModal(modalContent) {
    this.modalRef = this.modalService.open(modalContent, this.modalOptions)
    
  }

  addBranch() {

    this.modalRef.close();
    var branch = {
      branchName: this.branchNameModel,
      relTenantInstitutionId: localStorage.getItem('loggedInTenantId')
    }
    this.instService.addBranch(branch)
    .subscribe((data: any) => {
          this.branchData.push(branch)
          this.branchNameModel = null;
          console.log(data);
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

}

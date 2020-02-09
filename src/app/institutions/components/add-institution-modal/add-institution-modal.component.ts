import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City, State } from '../../shared/location.model';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Branch, BranchSection } from '../../shared/branch-section.model';
import { BSections } from '../institution-list/institution-list.component';
import { Router } from '@angular/router';
import { InstitutionService } from '../../shared/institution.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PersonDto, POC } from '../../shared/poc.model';
import { AddBranchModalComponent } from '../add-branch-modal/add-branch-modal.component';
import { formattedError } from '@angular/compiler';

@Component({
  selector: 'app-add-institution-modal',
  templateUrl: './add-institution-modal.component.html',
  styleUrls: ['./add-institution-modal.component.css']
})
export class AddInstitutionModalComponent implements OnInit {

  @Input() data: any;

  name:string;
  stepCount: number = 1;
  loading1: boolean = false;
  loading2: boolean = false;
  loading_tab1: boolean = true;
  img_url: string;
  institutionDetailForm: FormGroup;
  institutionPOCForm: FormGroup;
  allStates: State [] = [];
  allCities: City[] = [];
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
  branchModalOptions: NgbModalOptions;
  sectionModalOptions:NgbModalOptions;
  branchNameModel: string;
  sectionNameModel: string;
  selectedStateId: number;
  selectedCityId: number;
  selectedCountryId: number = 0;
  selectedTypeId:number;
  branches: Array<Branch> = new Array<Branch>();
  branchSections: BranchSection;
  myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  modalRef: NgbModalRef;
  loading_tab3: boolean = true;
  loading_tab2: boolean = true;
  home_page_tab: boolean = true;
  selectedBranchIndex: number = -1;

  //test

  bSectionsArray: Array<BSections> = new Array<BSections>();
  currentIndex: number = 0 ;
  singleSection: Array<string> = [];
  branchIndex: number = -1;

 institutionTypeNames = [
    {
      typeId: 1,
      typeName: 'College'
    },
    {
      typeId: 2,
      typeName: 'School'
    }
  ]
 formDetails: any;
 isEditForm: boolean = false;
 isCustomForm: boolean = false;
  constructor(private modalService: NgbModal ,private instService: InstitutionService, private formBuilder: FormBuilder
    ,private router: Router, private matDialog: MatDialog,@Inject(MAT_DIALOG_DATA) public details: any) {
    
    this.formDetails = details;
    

    this.modalOptions = {
      backdrop: 'static',
      centered: true,
      backdropClass:'customBackdrop',
      size: 'sm',
      windowClass: 'modal-container'
    }
    this.branchModalOptions = {
      backdrop: 'static',
      centered: true,
      backdropClass:'customBackdrop',
      size: 'sm',
      windowClass: 'branch-modal-container'
    }

     }


  openBranchModal(modalContent) {
    this.modalRef = this.modalService.open(modalContent, this.modalOptions)
    
  }

  openSectionModal(sectionContent) {
    this.modalRef = this.modalService.open(sectionContent, this.modalOptions)
  }
  
  closeModal() {
    this.matDialog.closeAll();
  }

  getRandomColor() {
    return {
      'border-color': this.myArray[Math.floor(Math.random() * this.myArray.length)]
    }
  }

  public getBranch(i) {
    console.log("got index", i)
    this.selectedBranchIndex = i;
    if(i > this.bSectionsArray.length - 1){
      var section = new BSections();
      this.bSectionsArray[this.selectedBranchIndex] = section;
    }
    this.singleSection = this.bSectionsArray[this.selectedBranchIndex].sections;
  }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };
    this.instService.uploadImage(file)
          .subscribe((data:any) => {
            console.log("file uploaded succesfully", data.pictureId);
            localStorage.setItem("pictureId",data.pictureId);
            this.loading_tab1 = false;
          })

  }


  getCities(stateId) {
    this.instService.getAllCities(stateId)
            .subscribe((data: City[]) => {
              this.allCities = data;
            })
  }
  get f() {return this.institutionDetailForm.controls}


  ngOnInit() {

  

    this.institutionDetailForm = this.formBuilder.group({
      institutionName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      institutionTypeId: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: 1,
      remarks: ['', Validators.required], 
      status: [1],
      pictureId: [''],
      institutionId: ['']
    })

    this.institutionPOCForm = this.formBuilder.group({
      primaryPOCFirstName: ['',Validators.required],
      primaryPOCLastName: ['',Validators.required],
      primaryPOCPhoneNumber: ['',Validators.required],
      primaryPOCEmail: ['',[Validators.required,Validators.email]],
      secondaryPOCFirstName: ['',Validators.required],
      secondaryPOCLastName: ['',Validators.required],
      secondaryPOCPhoneNumber: ['',Validators.required],
      secondaryPOCEmail: ['',[Validators.required,Validators.email]],
    })


    if(this.formDetails.relTenantInstitutionId){

      this.isEditForm = true
      this.home_page_tab = false;
      this.isCustomForm = true;
      this.selectedTypeId = this.formDetails.institutionTypeId
      this.selectedStateId = this.formDetails.stateId;
      this.getCities(this.formDetails.stateId)
      this.selectedCityId = this.formDetails.cityId;
      this.img_url = this.formDetails.pictureStream;

      this.institutionDetailForm.patchValue({
        institutionName: this.formDetails.institutionName,
        email: this.formDetails.email,
        website: this.formDetails.website,
        institutionTypeId: this.formDetails.institutionTypeId,
        address1: this.formDetails.address1,
        address2: this.formDetails.address2,
        addressId: this.formDetails.addressId,
        remarks: this.formDetails.remarks, 
        status: [1],
        countryId: 1,
        pictureId: [''],
      })
    } else if(this.formDetails.primaryPOCEmail) {
      this.home_page_tab = false;
      this.isCustomForm = true;
      this.isEditForm = false;
      this.stepCount++;
      console.log("poc", this.formDetails);
      
      this.institutionPOCForm.patchValue({
        primaryPOCFirstName: this.formDetails.primaryPOCFirstName,
        primaryPOCLastName: this.formDetails.primaryPOCLastName,
        primaryPOCPhoneNumber: this.formDetails.primaryPOCPhoneNumber,
        primaryPOCEmail:this.formDetails.primaryPOCEmail,
        secondaryPOCFirstName: this.formDetails.secondaryPOCName.split(" ")[0],
        secondaryPOCLastName: this.formDetails.secondaryPOCName.split(" ")[1],
        secondaryPOCPhoneNumber: this.formDetails.secondaryPOCPhoneNumber,
        secondaryPOCEmail: this.formDetails.secondaryPOCEmail,
      })
  
    } else {

    }


   
    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            console.log("st", data);
            this.allStates = data;
          })
  }

  updateDetails() {
    this.loading1 = true;
    console.log("check", this.formDetails)
    this.institutionDetailForm.patchValue({
      pictureId: this.formDetails.pictureId
      ,status: 1
      ,institutionId: this.formDetails.institutionId
    })
    this.instService.updateInstitutionDetails(this.institutionDetailForm.value)
          .subscribe((response: any) => {
            this.loading1 = false;
            this.loading_tab1 = false;
            this.matDialog.closeAll();
            console.log("update response", response)
          })
    console.log(this.institutionDetailForm)
  }

  updatePOCDetails() {
    this.loading1 = true;
    console.log("check", this.formDetails)
    this.institutionDetailForm.patchValue({
      pictureId: this.formDetails.pictureId
      ,status: 1
      ,institutionId: this.formDetails.institutionId
    })
    this.instService.updateInstitutionDetails(this.institutionDetailForm.value)
          .subscribe((response: any) => {
            this.loading1 = false;
            this.loading_tab1 = false;
            this.matDialog.closeAll();
            console.log("update response", response)
          })
    console.log(this.institutionDetailForm)
  }

  onSubmit() {
    this.stepCount++;
    this.loading1 = true;
    this.institutionDetailForm.patchValue({
      pictureId: localStorage.getItem('pictureId')
    })

    console.log("form validation check", this.institutionDetailForm.value);
    
    this.instService.createInstitutionDetails(this.institutionDetailForm.value)
          .subscribe((response: any) => {
            this.loading1 = false
            this.loading_tab1 = false;
            console.log("Succesfully added institution", response)
            localStorage.setItem('currentRelTenantInstitutionId', response.relTenantInstitutionId)
          })
    console.log("After API")
  }

  addPOCForm(){
    this.stepCount++;
    this.loading2 = true;

    console.log("poc form data",this.institutionPOCForm.value);
    
     let personDto = new PersonDto(this.institutionPOCForm.value.primaryPOCFirstName,
      this.institutionPOCForm.value.primaryPOCLastName,2, 'M'
      ,this.institutionPOCForm.value.primaryPOCEmail
      ,this.institutionPOCForm.value.primaryPOCPhoneNumber
      )
     let personObject = new POC(personDto,+localStorage.getItem('currentRelTenantInstitutionId'),this.institutionPOCForm.value.secondaryPOCEmail
     ,this.institutionPOCForm.value.secondaryPOCFirstName + " " + this.institutionPOCForm.value.secondaryPOCLastName,
     this.institutionPOCForm.value.secondaryPOCPhoneNumber)

     console.log("data to be posted", personObject)
     this.instService.addPOCDetails(personObject)
            .subscribe((response: any) => {
              this.loading2 = false;
              this.loading_tab2 = false
              console.log("poc response", response)
            })
  }

  addBranch() {
    this.branchIndex++;

    // this.bSectionsArray[this.branchIndex] = new BSections();
    // this.bSectionsArray[this.branchIndex].sections.push("A" + this.branchIndex)

    this.modalRef.close();
    console.log(this.branchNameModel)
    var branchData = {
      branchName: this.branchNameModel,
      relTenantInstitutionId: localStorage.getItem('currentRelTenantInstitutionId')
    }
    this.instService.addBranch(branchData)
    .subscribe((data: any) => {
          this.branches.push(new Branch(data.branchId,this.branchNameModel))
          this.branchNameModel = null;
          console.log(data);
          })
  }

  addSection(){
    this.singleSection.push(this.sectionNameModel)
    this.modalRef.close();

    var sectionRequestData = {
      branchId: this.branches[this.selectedBranchIndex].branchId,
      sectionName: this.sectionNameModel
    }

    this.instService.addSection(sectionRequestData)
          .subscribe((data: any) => {
            this.sectionNameModel = null;
            console.log(data)
          })
    // this.bSectionsArray[this.selectedBranchIndex].sections.push(this.sectionNameModel)

  }
  nextStep() {
    this.stepCount++;
    this.loading_tab3 = false;
  }

  finalStep() {
    this.stepCount++;
    this.loading_tab3 = false;
  }
  goToDetails(index) {
    this.router.navigate(['/institutions',this.data[index].institutionId])
  }
  test() {
    let arr = [
      {
        branchName: 'Branch A',
        sections: [
          'a',
          'b'
        ]
      }
    ]
  }
}

import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
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

  buttonDisable: boolean = true;

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
  selectedState: any;
  selectedCity: any;
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

  stateCopy: any;
  cityCopy: any;

  pocSubmitted = false;
  currentUsername: string;
  currentGeneratePassword: string;

  isEmailExists: boolean = false;
  bSectionsArray: Array<BSections> = new Array<BSections>();
  currentIndex: number = 0 ;
  singleSection: Array<string> = [];
  branchIndex: number = -1;
  globalUri: any;
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
 sendPicture: any;
  constructor(private modalService: NgbModal ,private instService: InstitutionService, private formBuilder: FormBuilder
    ,private router: Router, private matDialog: MatDialog,@Inject(MAT_DIALOG_DATA) public details: any, private ref: ChangeDetectorRef) {
    
    this.formDetails = details;
    
    localStorage.removeItem('pictureId')
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
      this.globalUri = this.img_url;
    };
    this.instService.uploadImage(file)
          .subscribe((data:any) => {
            this.buttonDisable = false;
            this.sendPicture = data.pictureStream;
            console.log("file uploaded succesfully", data);
            localStorage.setItem("pictureId",data.pictureId);
            this.loading_tab1 = false;
          })

  }


  getCities() {
    console.log("state here", this.selectedState);
    this.stateCopy = this.selectedState;
    this.instService.getAllCities(this.selectedState.stateId)
            .subscribe((data: City[]) => {
              this.allCities = data;
              console.log("city", data);
              
            })
  }

  
  getCitiesName() {
    this.cityCopy = this.selectedCity;
    console.log("ct here", this.selectedCity.cityName);
  }
  get f() {return this.institutionPOCForm.controls}


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
      remark1: ['', Validators.required], 
      remark2: ['', Validators.required], 
      remark3: ['', Validators.required], 
      remark4: ['', Validators.required], 
      status: [1],
      pictureId: [''],
      pincode: [''],
      institutionId: ['']
    })

    this.institutionPOCForm = this.formBuilder.group({
      primaryPOCFirstName: ['',Validators.required],
      primaryPOCLastName: ['',Validators.required],
      primaryPOCPhoneNumber: ['',Validators.required],
      primaryPOCEmail: ['',[Validators.required]],
      secondaryPOCFirstName: ['',Validators.required],
      secondaryPOCLastName: ['',Validators.required],
      secondaryPOCPhoneNumber: ['',Validators.required],
      secondaryPOCEmail: ['',[Validators.required,Validators.email]],
    })

   
    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            console.log("st", data);
            this.allStates = data;
          })
  }

 

  onSubmit() {

      console.log("there", localStorage.getItem('pictureId'));
      this.stepCount++;
      this.loading1 = true;
      this.institutionDetailForm.patchValue({
        pictureId: localStorage.getItem('pictureId'),
        stateId: this.selectedState.stateId,
        cityId: this.selectedCity.cityId
      })
  
      console.log("form validation check", this.institutionDetailForm.value);
      var that = this;
      this.instService.createInstitutionDetails(this.institutionDetailForm.value)
            .subscribe((response: any) => {
  
              var obj = {
                institutionId: response.institutionId,
                pictureStream: this.sendPicture,
                institutionName: that.institutionDetailForm.value.institutionName,
                stateName: that.stateCopy.stateName,
                cityName: that.cityCopy.cityName
              }
              this.instService.setNewInstituationData(obj);
              this.loading1 = false
              this.loading_tab1 = false;
              console.log("Succesfully added institution", response)
              localStorage.setItem('currentRelTenantInstitutionId', response.relTenantInstitutionId)
            })
      console.log("After API")
      
    
  }

  checkEmailExistence() {
    console.log("can call API");
    this.instService.checkWhetherEmailExists(this.institutionPOCForm.value.primaryPOCEmail)
          .subscribe((response:any) => {
            this.isEmailExists = response.emailExists
            console.log("respo email" , response);
            
          })
    
  }

  submittedPOC() {
    console.log("sub");
    
    this.pocSubmitted = true

  }
  addPOCForm(){
   

    console.log("poc form data",this.institutionPOCForm.value);
    
     let personDto = new PersonDto(this.institutionPOCForm.value.primaryPOCFirstName,
      this.institutionPOCForm.value.primaryPOCLastName,2, 'M'
      ,this.institutionPOCForm.value.primaryPOCEmail
      ,this.institutionPOCForm.value.primaryPOCPhoneNumber
      )
     let personObject = new POC(personDto,+localStorage.getItem('currentRelTenantInstitutionId'),this.institutionPOCForm.value.secondaryPOCEmail
     ,this.institutionPOCForm.value.secondaryPOCFirstName + " " + this.institutionPOCForm.value.secondaryPOCLastName,
     this.institutionPOCForm.value.secondaryPOCPhoneNumber)

     var that = this;
     console.log("data to be posted", this.institutionPOCForm.status)



     if (this.institutionPOCForm.invalid) {
      return;
      } else {
        this.stepCount++;
        this.loading2 = true;
        this.instService.addPOCDetails(personObject)
               .subscribe((response: any) => {
                 this.loading2 = false;
                 this.loading_tab2 = false
                 that.currentUsername = response.email;
                 that.currentGeneratePassword = response.passcode;
                 localStorage.setItem("currentPOC", JSON.stringify(response))
                 console.log("poc response", response) 
               })
      }
  }

  addBranch() {
    this.branchIndex++;


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
}

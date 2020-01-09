import { Component, OnInit, Input } from '@angular/core';
import { from, Subscriber } from 'rxjs';
import { Institutions } from './institution.data'
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { InstitutionService } from '../../shared/institution.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Institution } from '../../shared/institution-detail.model'
import { State, City } from '../../shared/location.model';
import { POC, PersonDto } from '../../shared/poc.model';
@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list-new.component.html',
  styleUrls: ['./institution-list-new.component.css']
})
export class InstitutionListComponent implements OnInit {

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
  branchNameModel: string;

  branches: Array<string> = [];
  myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  modalRef: NgbModalRef;
  loading_tab3: boolean = true;
  loading_tab2: boolean = true;

 
  constructor(private modalService: NgbModal ,private instService: InstitutionService, private formBuilder: FormBuilder){

    this.modalOptions = {
      backdrop: 'static',
      centered: true,
      backdropClass:'customBackdrop',
      size: 'xl',
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
  
  open(content) {
  
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBranchModal(modalContent) {
    this.modalRef = this.modalService.open(modalContent, this.branchModalOptions);
  }
  getRandomColor() {
    return {
      'border-color': this.myArray[Math.floor(Math.random() * this.myArray.length)]
    }
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
      institutionTypeId: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      remarks: ['', Validators.required], 
      status: [1],
      pictureId: [''],
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

    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            this.allStates = data;
          })
  }

  onSubmit() {
    this.stepCount++;
    this.loading1 = true;
    this.institutionDetailForm.patchValue({
      pictureId: localStorage.getItem('pictureId')
    })
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
    this.branches.push(this.branchNameModel)
    this.modalRef.close();
    console.log(this.branchNameModel)
    var branchData = {
      branchName: this.branchNameModel,
      relTenantInstitutionId: localStorage.getItem('currentRelTenantInstitutionId')
    }
    this.instService.addBranch(branchData)
          .subscribe(data => {
              console.log(data);
          })
  }

  nextStep() {
    this.stepCount++;
    this.loading_tab3 = false;
  }
}

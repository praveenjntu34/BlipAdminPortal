import { Component, OnInit, Input, Inject } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';
import { City, State } from '../../shared/location.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-institution-details',
  templateUrl: './edit-institution-details.component.html',
  styleUrls: ['./edit-institution-details.component.css']
})
export class EditInstitutionDetailsComponent implements OnInit {

  @Input() data: any;
  img_url: string;
  loading_tab1: boolean = true;
  allCities: City[] = [];
  formDetails: any;
  selectedCityId: number;
  selectedCountryId: number = 0;
  selectedTypeId:number;
  selectedStateId: number;
  institutionDetailForm: FormGroup;
  allStates: State [] = [];
  loading1: boolean = false;


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

  constructor(private instService: InstitutionService,@Inject(MAT_DIALOG_DATA) public details: any, private matDialog: MatDialog, private formBuilder: FormBuilder) {
    this.formDetails = details;
   }

  ngOnInit() {

     
    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            console.log("st", data);
            this.allStates = data;
          })
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
      addressId: 0,
      institutionId: ['']
    })


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
        remark1: this.formDetails.remark1, 
        remark2: this.formDetails.remark2, 
        remark3: this.formDetails.remark3, 
        remark4: this.formDetails.remark4, 
        status: [1],
        countryId: 1,
        pictureId: this.formDetails.pictureId,
      })

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
            this.institutionDetailForm.patchValue({
              pictureId: data.pictureId
            })
            this.loading_tab1 = false;
          })

  }

  getCities(stateId) {
    this.instService.getAllCities(stateId)
            .subscribe((data: City[]) => {
              this.allCities = data;
            })
  }

  updateDetails() {
    this.loading1 = true;
    console.log("check", this.formDetails)
    this.institutionDetailForm.patchValue({
       status: 1
      ,institutionId: this.formDetails.institutionId
      ,addressId: this.formDetails.addressId
    })
    this.instService.updateInstitutionDetails(this.institutionDetailForm.value)
          .subscribe((response: any) => {
            this.loading1 = false;
            this.loading_tab1 = false;
            this.matDialog.closeAll();
            console.log("update response", response)
            window.location.reload();
          })
    console.log(this.institutionDetailForm.value)
  }

}

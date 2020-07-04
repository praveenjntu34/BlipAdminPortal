import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionService } from '../../shared/institution.service';

@Component({
  selector: 'app-edit-institution-poc-details',
  templateUrl: './edit-institution-poc-details.component.html',
  styleUrls: ['./edit-institution-poc-details.component.css']
})
export class EditInstitutionPocDetailsComponent implements OnInit {

  formDetails: any;
  institutionPOCForm: FormGroup;


  constructor(private instService: InstitutionService,@Inject(MAT_DIALOG_DATA) public details: any, private matDialog: MatDialog, private formBuilder: FormBuilder) {
    this.formDetails = details;
    console.log("Form inside", this.formDetails);
    

   }

  ngOnInit() {
    this.institutionPOCForm = this.formBuilder.group({
      primaryPOCFirstName: ['',Validators.required],
      primaryPOCLastName: ['',Validators.required],
      primaryPOCPhoneNumber: ['',Validators.required],
      primaryPOCEmail: ['',[Validators.required,Validators.email]],
      secondaryPOCFirstName: ['',Validators.required],
      secondaryPOCLastName: ['',Validators.required],
      secondaryPOCPhoneNumber: ['',Validators.required],
      secondaryPOCEmail: ['',[Validators.required,Validators.email]],
      personId: 0
      ,institutionAdminId: 0
      ,loginCredentialId: 0
    })


      this.institutionPOCForm.patchValue({
        primaryPOCFirstName: this.formDetails.primaryPOCFirstName,
        primaryPOCLastName: this.formDetails.primaryPOCLastName,
        primaryPOCPhoneNumber: this.formDetails.primaryPOCPhoneNumber,
        primaryPOCEmail:this.formDetails.email,
        secondaryPOCFirstName: this.formDetails.secondaryPOCName.split(" ")[0],
        secondaryPOCLastName: this.formDetails.secondaryPOCName.split(" ")[1],
        secondaryPOCPhoneNumber: this.formDetails.secondaryPOCPhoneNumber,
        secondaryPOCEmail: this.formDetails.secondaryPOCEmail,
      })
  

  }

  updatePOCDetails() {
    console.log("check", this.formDetails)
    this.institutionPOCForm.patchValue({
      personId: this.formDetails.personId
      ,institutionAdminId: this.formDetails.institutionAdminId
      ,loginCredentialId: this.formDetails.loginCredentialId
    })
    var that = this;
    this.instService.updatePOCDetails(this.institutionPOCForm.value)
          .subscribe((response: any) => {
            this.matDialog.closeAll();
            window.location.reload();
            console.log("update response", response)
          })
    console.log("login",this.institutionPOCForm.value)
  }
}

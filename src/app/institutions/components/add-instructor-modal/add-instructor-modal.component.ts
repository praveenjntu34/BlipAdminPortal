import { Component, OnInit, Inject } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogContainer} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-instructor-modal',
  templateUrl: './add-instructor-modal.component.html',
  styleUrls: ['./add-instructor-modal.component.css']
})
export class AddInstructorModalComponent implements OnInit {

  instructorForm: FormGroup;
  selectedSections: any = [];
  setBranches: any = [];
  constructor(private instService: InstitutionService,private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<MatDialogContainer>
    ,@Inject(MAT_DIALOG_DATA) public branches: any) { 
    this.setBranches = branches;
  }

  ngOnInit() {
    this.instructorForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phoneNumber: [''],
      branchId: ['', Validators.required],
      sectionId: ['', Validators.required],
    })

    console.log("Inside dialog", this.branches)
  }

  onChangeBranch(value) {
    console.log(this.setBranches);
    this.setBranches.forEach((branch:any) => {
      if(branch.branchId == value) {
        console.log(branch.branchName);
        this.selectedSections = branch.sections
      }
    })
    console.log("changed",value)
  }

  saveInstructor() {
    console.log("form values", this.branches[0].relTenantInstitutionId)
    var requestObject = {
      firstname: this.instructorForm.value.firstname,
      lastname :this.instructorForm.value.lastname,
      email : this.instructorForm.value.email,
      designation : this.instructorForm.value.designation,
      phoneNumber: this.instructorForm.value.phoneNumber,
      sectionId: this.instructorForm.value.sectionId,
      relTenantInstitutionId: this.branches[0].relTenantInstitutionId
    }
    this.instService.addInstructor(requestObject)
          .subscribe(data => {
            console.log("response from instructor",data)
            this.dialogRef.close();
          })
  }
}

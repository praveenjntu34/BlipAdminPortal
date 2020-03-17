import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-instructor-modal',
  templateUrl: './edit-instructor-modal.component.html',
  styleUrls: ['./edit-instructor-modal.component.css']
})
export class EditInstructorModalComponent implements OnInit {

  instructorFormDetails: any;
  instructorForm: FormGroup;

  selectedSections: any = [];
  setBranches: any = [];
  
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public details: any) { 
    this.instructorFormDetails = details;
    this.setBranches = details.branches
    console.log("Details", details);
    
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

  ngOnInit() {
    this.setBranches = this.details.branches;
    this.instructorForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phoneNumber: [''],
      branchId: ['', Validators.required],
      sectionId: ['', Validators.required],
    })

    this.instructorForm.patchValue({
      firstname: this.instructorFormDetails.instructors.firstName,
      lastname: this.instructorFormDetails.instructors.lastName,
      email: this.instructorFormDetails.instructors.email,
      designation: this.instructorFormDetails.instructors.designation,
      phoneNumber: this.instructorFormDetails.instructors.phoneNumber,
      branchId: this.instructorFormDetails.instructors.branchId,
      sectionId: this.instructorFormDetails.instructors.sectionId,
    })
  }

}

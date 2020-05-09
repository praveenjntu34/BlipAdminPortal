import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { MatDialog } from '@angular/material';
import { Branch } from 'src/app/institutions/shared/branch-section.model';
import { ParentService } from '../shared/parentservice';

@Component({
  selector: 'app-add-parent-modal',
  templateUrl: './add-parent-modal.component.html',
  styleUrls: ['./add-parent-modal.component.css']
})
export class AddParentModalComponent implements OnInit {

  parentForm: FormGroup;
  allBranches: Branch[] = [];
  allSections: any = [];
  selectedSectionId: number = 0;
  
  constructor(private formBuilder: FormBuilder, private institutionService: InstitutionService,private parentService: ParentService,private matDialog: MatDialog) { }


  getSections(branchId) {
    console.log("brachId", branchId);
    this.allSections = this.allBranches.find(x => x.branchId == branchId).sections;
    console.log("all", this.allSections);  
  }
  
  addParent() {
    console.log(this.parentForm.value);
    this.parentForm.patchValue({
      sectionId: this.selectedSectionId,
      relTenantInstitutionId:localStorage.getItem('loggedInTenantId')
    })

    this.parentService.addParent(this.parentForm.value)
          .subscribe(data => {
            var obj = {
              childrenName: this.parentForm.value.childrenName,
              admissionId: this.parentForm.value.admissionNumber,
              secondaryPhoneNumber: this.parentForm.value.secondaryPhoneNumber,
              email: this.parentForm.value.email,
              phoneNUmber: this.parentForm.value.phoneNumber,
              firstName: this.parentForm.value.parentOneFirstName,
              lastName: this.parentForm.value.parentOneLastName
            }

            this.parentService.setNewParentData(obj)
            this.matDialog.closeAll();
            console.log("response", data);
            
          })
    console.log("before",this.parentForm.value);
    
  }
  closeModal() {
    this.matDialog.closeAll();
  }

  ngOnInit() {
    this.parentForm = this.formBuilder.group({
      parentOneFirstName: ['', Validators.required],
      parentOneLastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [],
      parentTwoName: [],
      admissionNumber: '',
      childrenName: '',
      secondaryPhoneNumber: '',
      relTenantInstitutionId: 0,
      sectionId: 0
    })
    var that = this;
    this.institutionService.getInstitutionBranches(localStorage.getItem('loggedInTenantId'))
          .subscribe((response: any) => {
            console.log("Data", response);
            that.allBranches = response;
            console.log(this.allBranches);
          })
  }
}

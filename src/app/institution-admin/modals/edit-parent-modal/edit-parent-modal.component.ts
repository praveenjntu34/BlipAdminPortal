import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ParentService } from '../../shared/parentservice';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { Branch } from 'src/app/institutions/shared/branch-section.model';

@Component({
  selector: 'app-edit-parent-modal',
  templateUrl: './edit-parent-modal.component.html',
  styleUrls: ['./edit-parent-modal.component.css']
})
export class EditParentModalComponent implements OnInit {

  parentForm: FormGroup;
  childId: number;
  data: any;

  allBranches: Branch[] = [];
  allSections: any = [];
  selectedBranchId: number;
  selectedSectionId: number;
  


  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataChild: number,private parentService: ParentService, private institutionService: InstitutionService) { 
    this.childId = dataChild;
    // console.log("sdd", this.parentFormDetails);
    
  }

  ngOnInit() {

    var that = this;
    this.institutionService.getInstitutionBranches(localStorage.getItem('loggedInTenantId'))
          .subscribe((response: any) => {
            console.log("Data", response);
            that.allBranches = response;
            console.log(this.allBranches);
          })

    this.parentForm = this.formBuilder.group({
      parentOneFirstName: ['', Validators.required],
      parentOneLastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [],
      secondaryParentName: [],
      admissionNumber: '',
      childrenName: '',
      secondaryPhoneNumber: '',
      relTenantInstitutionId: 0,
      sectionId: 0,
      branchId: 0,
      personId: 0,
      loginCredentialId: 0,
      parentId: 0,
      childId: 0
    })

    this.parentService.getSingleParents(this.childId)
    .subscribe(response => {
      console.log("rr",response);
      this.data = response;
      this.patchForm()
      // this.ngxService.stop();
    })

    

    console.log("Net", this.data);
    
   


  }

  getSections(branchId) {
    console.log("brachId", branchId);
    this.allSections = this.allBranches.find(x => x.branchId == branchId).sections;
    console.log("all", this.allSections);  
  }

  updateParent() {
    console.log("here", this.parentForm.value);

    this.parentService.updateparent(this.parentForm.value)
          .subscribe(res => {
            console.log("response", res);
            
          })
  }

  patchForm() {
    console.log("Net2", this.data[0].branchId);
    
    this.selectedBranchId = this.data[0].branchId;
    this.selectedSectionId = this.data[0].sectionId;
    this.parentForm.patchValue({
      parentOneFirstName: this.data[0].firstName,
      parentOneLastName: this.data[0].lastName,
      email: this.data[0].email,
      phoneNumber: this.data[0].phoneNumber,
      secondaryParentName: this.data[0].secondaryParentName,
      admissionNumber: this.data[0].admissionId,
      childrenName: this.data[0].childrenName,
      secondaryPhoneNumber: this.data[0].secondaryPhoneNUmber,
      relTenantInstitutionId: localStorage.getItem('loggedInTenantId'),
      personId: this.data[0].personId,
      loginCredentialId: this.data[0].loginCredentialId,
      parentId: this.data[0].parentId,
      childId: this.data[0].childId
    })
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ParentService } from '../../shared/parentservice';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { Branch } from 'src/app/institutions/shared/branch-section.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-edit-parent-modal',
  templateUrl: './edit-parent-modal.component.html',
  styleUrls: ['./edit-parent-modal.component.css']
})
export class EditParentModalComponent implements OnInit {

  parentForm: FormGroup;
  childId: number;
  userData: any;
  color: ThemePalette = 'accent';

  allBranches: Branch[] = [];
  allSections: any = [];
  selectedBranchId: number;
  selectedSectionId: number;
  
  chk;


  constructor(private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService, private matDialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public dataChild: any,private parentService: ParentService, private institutionService: InstitutionService) { 
    this.userData = dataChild;
     console.log("sdd", this.dataChild);
    
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
      secondaryPhoneNumber: '',
      relTenantInstitutionId: 0,
      personId: 0,
      loginCredentialId: 0,
      parentId: 0,
      admissionNumber: '',
      childrenName: '',
      childId: 0,
      enabled: ''

    })

  
    this.patchParentForm();
  
   


  }

  getSections(branchId) {
    console.log("brachId", branchId);
    this.allSections = this.allBranches.find(x => x.branchId == branchId).sections;
    console.log("all", this.allSections);  
  }

  updateParent() {
    console.log("here", this.parentForm.value);

    this.ngxService.start();
    var obj = {
      email: this.userData.email,
      loginCredentialId: this.userData.loginCredentialId,
      parentId: this.userData.parentId,
      parentOneFirstName: this.userData.firstName,
      parentOneLastName: this.userData.lastName,
      personId: this.userData.personId,
      phoneNumber: this.userData.phoneNumber,
      secondaryParentName: this.userData.secondaryParentName,
      secondaryPhoneNumber: this.userData.secondaryPhoneNUmber
    }

    this.parentService.updateparent(this.parentForm.value)
          .subscribe(res => {
            this.ngxService.stop();
            console.log("response", res);
            this.matDialog.closeAll();
            window.location.reload(); 
            
          })
  }

  changeTog(event) {
    this.parentForm.patchValue({
      enabled: event.checked
    })

    console.log("tog", this.parentForm.value.enabled);
    
  }
  patchParentForm() {
    console.log("Net2", this.userData.enabled);
    this.chk = this.userData.enabled;
    this.selectedBranchId = this.userData.branchId;
    this.selectedSectionId = this.userData.sectionId;
    this.parentForm.patchValue({
      parentOneFirstName: this.userData.firstName,
      parentOneLastName: this.userData.lastName,
      email: this.userData.email,
      phoneNumber: this.userData.phoneNumber,
      secondaryParentName: this.userData.secondaryParentName,
      secondaryPhoneNumber: this.userData.secondaryPhoneNUmber,
      relTenantInstitutionId: localStorage.getItem('loggedInTenantId'),
      personId: this.userData.personId,
      loginCredentialId: this.userData.loginCredentialId,
      parentId: this.userData.parentId,
      childId: this.userData.childId,
      admissionNumber: this.userData.admissionId,
      childrenName: this.userData.childrenName,
      enabled: this.userData.enabled
    })
  }

}

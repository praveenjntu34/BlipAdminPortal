import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstructorService } from '../../shared/instructor.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as uuid from 'uuid';
import { s3Conf } from '../../../../environments/environment.prod'
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-edit-instructor-modal',
  templateUrl: './edit-instructor-modal.component.html',
  styleUrls: ['./edit-instructor-modal.component.css']
})
export class EditInstructorModalComponent implements OnInit {

  instructorFormDetails: any;
  instructorForm: FormGroup;

  chk;
  instructorImage: String;
  selectedSections: any = [];
  setBranches: any = [];
  selectedBranchId: number;
  selectedSectionId: number;


  img_url: any;
  bucket;

  s3UploadedUrl: String = "";

  constructor(private formBuilder: FormBuilder,private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public details: any,private ngxService: NgxUiLoaderService, private instructorService: InstructorService) { 
    this.instructorFormDetails = details;
    this.setBranches = details.branches
    console.log("Details", details);
    
  }

  onFileChanged(event) {

    console.log("appeared");
    
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };
  
  
      const params = {
        Bucket: 'blip',
        Key: 'instructors/' + uuid.v4() + '.jpeg',
        Body: file,
        ACL:'public-read'
      };
  
      this.bucket.upload(params, (err, data) => {
        console.log("Success msg", data);
        this.s3UploadedUrl = data.Location;
        this.instructorForm.patchValue({
          image: this.s3UploadedUrl
        })
      })
  
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

    this.bucket = new S3(
      {
        accessKeyId: s3Conf.accessKeyId,
        secretAccessKey: s3Conf.secretAccessKey,
        region: 'ap-south-1'
      }
    );

    this.setBranches = this.details.branches;
    this.instructorForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phoneNumber: [''],
      branchId: ['', Validators.required],
      sectionId: ['', Validators.required],
      personId: 0,
      instructorId: 0,
      loginCredentialId: 0,
      enabled: '',
      image: ''
    })

    this.chk = this.instructorFormDetails.instructors.enabled;
    this.instructorImage = this.instructorFormDetails.instructors.image;

    this.selectedBranchId = this.instructorFormDetails.instructors.branchId;
    this.onChangeBranch(this.instructorFormDetails.instructors.branchId);
    this.selectedSectionId = this.instructorFormDetails.instructors.sectionId;
    this.instructorForm.patchValue({
      firstname: this.instructorFormDetails.instructors.firstName,
      lastname: this.instructorFormDetails.instructors.lastName,
      email: this.instructorFormDetails.instructors.email,
      designation: this.instructorFormDetails.instructors.designation,
      phoneNumber: this.instructorFormDetails.instructors.phoneNumber,
      branchId: this.instructorFormDetails.instructors.branchId,
      sectionId: this.instructorFormDetails.instructors.sectionId,
      personId: this.instructorFormDetails.instructors.personId,
      instructorId: this.instructorFormDetails.instructors.instructorId,
      loginCredentialId: this.instructorFormDetails.instructors.loginCredentialId,
      enabled: this.instructorFormDetails.instructors.enabled,
      image: this.instructorFormDetails.instructors.image
    })
  }

  changeTog(event) {
    this.instructorForm.patchValue({
      enabled: event.checked,
      image: this.s3UploadedUrl
    })

    console.log("tog", this.instructorForm.value.enabled);
    
  }

  saveInstructor() {
    console.log("s3",this.s3UploadedUrl);
    
   
    this.ngxService.start();
    this.instructorService.saveInstructor(this.instructorForm.value)
          .subscribe(res => {
            console.log("saved and returned");
            
            this.ngxService.stop();
            this.matDialog.closeAll();
            console.log("res", res);
            window.location.reload();
          })
  }

  getSections(branchId) {
   
  }


}

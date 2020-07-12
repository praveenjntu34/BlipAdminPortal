import { Component, OnInit, Inject } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogContainer} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { s3Conf } from '../../../../environments/environment.prod'
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-add-instructor-modal',
  templateUrl: './add-instructor-modal.component.html',
  styleUrls: ['./add-instructor-modal.component.css']
})
export class AddInstructorModalComponent implements OnInit {

  instructorForm: FormGroup;
  selectedSections: any = [];
  setBranches: any = [];

  img_url: any;
  bucket;

  s3UploadedUrl: String = "";

  constructor(private instService: InstitutionService,private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<MatDialogContainer>
    ,@Inject(MAT_DIALOG_DATA) public branches: any) { 
    this.setBranches = branches;
  }

  ngOnInit() {
    this.bucket = new S3(
      {
        accessKeyId: s3Conf.accessKeyId,
        secretAccessKey: s3Conf.secretAccessKey,
        region: 'ap-south-1'
      }
    );

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

  saveInstructor() {
    console.log("form values", this.branches[0].relTenantInstitutionId)
    var requestObject = {
      firstname: this.instructorForm.value.firstname,
      lastname :this.instructorForm.value.lastname,
      email : this.instructorForm.value.email,
      designation : this.instructorForm.value.designation,
      phoneNumber: this.instructorForm.value.phoneNumber,
      sectionId: this.instructorForm.value.sectionId,
      relTenantInstitutionId: this.branches[0].relTenantInstitutionId,
      image: this.s3UploadedUrl
    }
    this.instService.addInstructor(requestObject)
          .subscribe(data => {
            var obj = {
              instructorId: 1,
              firstName: requestObject.firstname,
              lastName: requestObject.lastname,
              email: requestObject.email,
              phoneNumber: requestObject.phoneNumber,
              designation: requestObject.designation,
              relTenantInstitutionId: requestObject.relTenantInstitutionId,
              sectionId: requestObject.sectionId
            }

            this.instService.setNewInstructorData(obj)
            console.log("response from instructor",data)
            this.dialogRef.close();
          })
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { PostService } from '../../shared/post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css']
})
export class EditPostModalComponent implements OnInit {
  img_url: string;
  postForm: FormGroup;
  postId: number;
  data: any;
  constructor(private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService, 
    private matDialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public postData: any,
    private institutionService: InstitutionService,private postService: PostService) { 
      this.data = postData;
    }


  ngOnInit() {

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      postId: 0
    })

    console.log("post data", this.data);
    
    this.postForm.patchValue({
      title: this.data.title,
      message: this.data.postText,
      postId: this.data.postId
    })
  }

  updatePost() {
    var obj = {
      title: this.postForm.value.title,
      message: this.postForm.value.message,
      postId: this.postForm.value.postId,
      sectionId: this.data.section.sectionId,
      attachmentStreamId: this.data.attachmentStreamId,
      relTenantInstitutionId: this.data.relTenantInstitutionId
    }

    this.ngxService.start();
    this.postService.update(obj)
          .subscribe(data => {
            this.ngxService.stop();
            window.location.reload();
          })
  }

}

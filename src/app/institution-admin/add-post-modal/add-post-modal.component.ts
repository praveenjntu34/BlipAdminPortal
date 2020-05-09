import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { Branch } from '../shared/branch.model';
import { PostService } from '../shared/post.service'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  img_url: string;
  postForm: FormGroup;
  allBranches: Branch[] = [];
  postId: number;
  allSections: any = [];
  selectedSectionId: number = 0;
  constructor(private formBuilder: FormBuilder, private institutionService: InstitutionService,private matDialog: MatDialog, private postService: PostService) { }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };

    this.postForm.patchValue({
      attachmentStream: file
    })

    this.postService.addPostFile(this.postForm.value.attachmentStream)
          .subscribe((data: any) => {
            this.postId = data.postId;
            console.log("response", data);
          })
  }

  getSections(branchId) {
    console.log("brachId", branchId);
    this.allSections = this.allBranches.find(x => x.branchId == branchId).sections;
    console.log("all", this.allSections);  
  }
  
  addPost() {
    console.log(this.postForm.value);
    this.postForm.patchValue({
      sectionId: this.selectedSectionId
    })

    this.postForm.patchValue({
      postId: this.postId
    })
    this.postService.addPost(this.postForm.value)
          .subscribe(data => {
            console.log("response", data);
            
          })
    console.log("before",this.postForm.value);
    
  }
  closeModal() {
    this.matDialog.closeAll();
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      attachmentStream: [],
      sectionId: [],
      postId: 0,
      relTenantInstitutionId: 1
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

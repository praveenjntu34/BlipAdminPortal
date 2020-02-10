import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/institutions/shared/institution.service';
import { Branch } from '../shared/branch.model';
import { PostService } from '../shared/post.service'

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  img_url: string;
  postForm: FormGroup;
  allBranches: Branch[] = [];

  allSections: any = [];
  selectedSectionId: number = 0;
  constructor(private formBuilder: FormBuilder, private institutionService: InstitutionService, private postService: PostService) { }

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


    // this.instService.uploadImage(file)
    //       .subscribe((data:any) => {
    //         console.log("file uploaded succesfully", data.pictureId);
    //         localStorage.setItem("pictureId",data.pictureId);
    //         this.loading_tab1 = false;
    //       })

  }
  getSectionsId(id) {
    console.log("idds", id);
    console.log(this.selectedSectionId);
    
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


    const formData = new FormData();
    formData.append('file', this.postForm.get('attachmentStream').value);
    formData.append('data', new Blob([JSON.stringify(this.postForm.value)], {
      type: "application/json"
    }));

    
    this.postService.addPost(formData)
          .subscribe(data => {
            console.log("response", data);
            
          })
    console.log("before",this.postForm.value);
    
    
  }


  ngOnInit() {

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      attachmentStream: [],
      sectionId: []
    })

    var that = this;
    this.institutionService.getInstitutionBranches(1)
          .subscribe((response: any) => {
            console.log("Data", response);
            that.allBranches = response;
            console.log(this.allBranches);
          })
  }

}

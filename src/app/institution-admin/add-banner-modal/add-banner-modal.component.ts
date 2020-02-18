import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BannerService } from '../shared/banner.service';

@Component({
  selector: 'app-add-banner-modal',
  templateUrl: './add-banner-modal.component.html',
  styleUrls: ['./add-banner-modal.component.css']
})
export class AddBannerModalComponent implements OnInit {

  postForm: FormGroup;
  img_url: string;
  img_url2: string;
  bannerId: number;
  
  constructor(private formBuilder: FormBuilder, private bannerService: BannerService,) { }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };

    this.postForm.patchValue({
      bannerStream: file
    })

    this.bannerService.addBannerFile(this.postForm.value.bannerStream)
          .subscribe((data: any) => {
            this.bannerId = data.bannerId;
            console.log("response", data);
          })
  }

  addBanner() {
    console.log(this.postForm.value);

    this.postForm.patchValue({
      bannerId: this.bannerId,
      relTenantInstitutionId: localStorage.getItem('loggedInTenantId')
    })
    this.bannerService.addPost(this.postForm.value)
          .subscribe(data => {
            console.log("response", data);
            
          })
    console.log("before",this.postForm.value);
    
  }


  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      bannerStream: [],
      relTenantInstitutionId: [],
      bannerId: []
    })
  }

}

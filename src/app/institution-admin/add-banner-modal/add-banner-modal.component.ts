import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BannerService } from '../shared/banner.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-banner-modal',
  templateUrl: './add-banner-modal.component.html',
  styleUrls: ['./add-banner-modal.component.css']
})
export class AddBannerModalComponent implements OnInit {

  bannerForm: FormGroup;
  img_url: string;
  img_url2: string;
  bannerId: number;
  sendPicture: any;
  constructor(private formBuilder: FormBuilder, private bannerService: BannerService,private matDialog: MatDialog,  private ngxSpinner: NgxUiLoaderService) { }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };

    this.bannerForm.patchValue({
      bannerStream: file
    })

    this.bannerService.addBannerFile(this.bannerForm.value.bannerStream)
          .subscribe((data: any) => {
            this.bannerId = data.bannerId;
            this.sendPicture = data.bannerStream;
            console.log("response", data);
          })
  }

  addBanner() {
    console.log(this.bannerForm.value);
    this.ngxSpinner.start()
    this.bannerForm.patchValue({
      bannerId: this.bannerId,
      relTenantInstitutionId: localStorage.getItem('loggedInTenantId')
    })

    var thisPointer = this;
    this.bannerService.addPost(this.bannerForm.value)
          .subscribe(data => {
            var obj = {
              bannerId: thisPointer.bannerId,
              relTenantInstitutionId: 0,
              title: null,
              bannerStream:thisPointer.sendPicture
            }
            this.bannerService.setNewBannerData(obj)
            this.ngxSpinner.stop();
            this.matDialog.closeAll();
            console.log("response", data);
            
          })
    console.log("before",this.bannerForm.value);
    
  }


  ngOnInit() {
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      bannerStream: [],
      relTenantInstitutionId: [],
      bannerId: []
    })
  }

}

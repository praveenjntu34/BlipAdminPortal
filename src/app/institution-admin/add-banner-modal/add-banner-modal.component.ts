import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BannerService } from '../shared/banner.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

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

  file: File;

  role: String;
  toppings = new FormControl();
  toppingList:any;
  constructor(private formBuilder: FormBuilder, private bannerService: BannerService,private matDialog: MatDialog,  private ngxSpinner: NgxUiLoaderService) { }

  // onFileChanged(event) {
  //   let file: File = event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file); 
  //   reader.onload = (e: any) => {
  //     this.img_url = e.target.result;
  //   };

  //   this.bannerForm.patchValue({
  //     bannerStream: file
  //   })

  //   this.bannerService.addBannerFile(this.bannerForm.value.bannerStream)
  //         .subscribe((data: any) => {
  //           this.bannerId = data.bannerId;
  //           this.sendPicture = data.bannerStream;
  //           console.log("response", data);
  //         })
  // }

  onFileChanged(event) {
    this.file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };

  }

  addBanner() {
    console.log(this.bannerForm.value);
    this.ngxSpinner.start()

    var id = [];
    if(this.toppings.value == null || this.toppings.value.length == 0) {
      id.push(parseInt(localStorage.getItem('loggedInTenantId')))
    } else {
      id = this.toppings.value;
    }
    
    this.bannerForm.patchValue({
      // relTenantInstitutionId: localStorage.getItem('loggedInTenantId')
       relTenantInstitutionId: id,
       auditCreatedBy: localStorage.getItem('loggedInRole') === 'SuperAdmin' ? 0 : null
    })

    console.log("Chk",this.bannerForm.value.auditCreatedBy );
    

    var thisPointer = this;

    this.bannerService.addMultipleBanner(this.file, this.bannerForm.value)
    .subscribe((data: any) => {
      window.location.reload();
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


    // this.bannerService.addPost(this.bannerForm.value)
    //       .subscribe(data => {
           
            
    //       })
    console.log("before",this.bannerForm.value);
    
  }

  changedCombo(event) {
    console.log(this.toppings.value)
  }

  ngOnInit() {

    this.role = localStorage.getItem('loggedInRole') // === 'SuperAdmin'
    this.bannerService.getAllInstitutions()
          .subscribe(res => {
            this.toppingList = res;
          })
  
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      relTenantInstitutionId: [],
      auditCreatedBy: []
    })
  }

}

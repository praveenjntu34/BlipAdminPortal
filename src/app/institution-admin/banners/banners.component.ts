import { Component, OnInit } from '@angular/core';
import { BannerService } from '../shared/banner.service';
import { MatDialog } from '@angular/material';
import { AddBannerModalComponent } from '../add-banner-modal/add-banner-modal.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  
  banners: any = [];
  constructor(private bannerService: BannerService, private matDialogue: MatDialog) {

   }


  ngOnInit() {
    let id = localStorage.getItem('loggedInTenantId');
    if(localStorage.getItem('loggedInRole') === 'SuperAdmin') {
      this.bannerService.getAllBanners(id)
      .subscribe(response => {
        console.log("rrr", response);
        
        this.banners = response;
      })
    } else {
      this.bannerService.getAllBannersForInstitution(id)
      .subscribe(response => {
        console.log("rrr", response);
        
        this.banners = response;
      })
    }
   
    this.updateBannerData();
  }

  openModal() {
    this.matDialogue.open(AddBannerModalComponent, {
      width: '800px',
      height: '500px',
      panelClass: 'custom-dialog-container'
    })
  }
  getPicture(stream) {
    let objectURL = 'data:image/jpeg;base64,' + stream;      
    return objectURL;
  }
  
  private updateBannerData() {
    this.subscriptions.push(this.bannerService.updateList
      .subscribe(isUpdated => {
        if (isUpdated) {
          const newDataToAdd = this.bannerService.getNewBannerData();
          this.bannerService.resetNewBannerData();
          if(newDataToAdd != null) {
            this.banners.push(newDataToAdd)
          }
        }
      }))
  }

  private deleteBanner(banner) {
    console.log("ban", banner);
    
    this.bannerService.deleteBanner(banner.bannerId)
          .subscribe(data => {
            window.location.reload();
          })
  }

}

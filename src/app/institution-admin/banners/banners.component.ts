import { Component, OnInit } from '@angular/core';
import { BannerService } from '../shared/banner.service';
import { MatDialog } from '@angular/material';
import { AddBannerModalComponent } from '../add-banner-modal/add-banner-modal.component';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners: any = [];
  constructor(private bannerService: BannerService, private matDialogue: MatDialog) {

   }


  ngOnInit() {
    let id = localStorage.getItem('loggedInTenantId');
    this.bannerService.getAllBanners(id)
          .subscribe(response => {
            console.log("rrr", response);
            
            this.banners = response;
          })
  }

  openModal() {
    this.matDialogue.open(AddBannerModalComponent, {
      width: '1000px',
      height: '600px',
      panelClass: 'custom-dialog-container'
    })
  }
  getPicture(stream) {
    let objectURL = 'data:image/jpeg;base64,' + stream;      
    return objectURL;
  }
  
}

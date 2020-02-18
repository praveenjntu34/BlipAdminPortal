import { Component, OnInit } from '@angular/core';
import { BannerService } from '../shared/banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners: any = [];
  constructor(private bannerService: BannerService) {

   }


  ngOnInit() {
    let id = localStorage.getItem('loggedInTenantId');
    this.bannerService.getAllBanners(id)
          .subscribe(response => {
            console.log("rrr", response);
            
            this.banners = response;
          })
  }

  getPicture(stream) {
    let objectURL = 'data:image/jpeg;base64,' + stream;      
    return objectURL;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institution-detail-page',
  templateUrl: './institution-detail-page.component.html',
  styleUrls: ['./institution-detail-page.component.css']
})
export class InstitutionDetailPageComponent implements OnInit {

  data: any;
  coreData: any;
  constructor(protected api: InstitutionService,private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      if(params['id']) {
          console.log("active", params['id'])
          this.api.getInstitutionDetails(params['id'])
                    .subscribe(data => {
                      this.coreData = data;
                      console.log("returned", data);
                      
                    })
      }
  })
   }

  ngOnInit() {
    this.data = this.api.getBranches()
    console.log("data here", this.data)
  }

}

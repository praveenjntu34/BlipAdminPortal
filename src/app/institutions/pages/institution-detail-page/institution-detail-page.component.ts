import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';

@Component({
  selector: 'app-institution-detail-page',
  templateUrl: './institution-detail-page.component.html',
  styleUrls: ['./institution-detail-page.component.css']
})
export class InstitutionDetailPageComponent implements OnInit {

  data: any = [];
  constructor(protected api: InstitutionService) {
    
   }

  ngOnInit() {
    this.data = this.api.getInstitutionDetails();
    console.log("data here", this.data)
  }

}

import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../shared/institution.service';

@Component({
  selector: 'app-institution-list-page',
  template: '<app-institution-list [data]="data"></app-institution-list>',
  styleUrls: ['./institution-list-page.component.css']
})
export class InstitutionListPageComponent implements OnInit {

  data: any = [];
  image: any;
  sanitizer
  constructor(protected api: InstitutionService) { 
    this.api.getAllInstitutions()
    .subscribe((data : any) => {
      data.forEach((institution: any, index) => {
        
        let objectURL = 'data:image/jpeg;base64,' + institution.pictureStream;      
        institution.pictureStream = objectURL;
        this.data.push(institution)
      });
    })
  }

  ngOnInit() {
   
  }

}

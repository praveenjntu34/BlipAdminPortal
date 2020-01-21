import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../shared/institution.service';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit, OnChanges {


  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {


    this.api.getInstitutionBranches(this.coreData.relTenantInstitutionId)
              .subscribe(data => {
                console.log("branch", data);
                this.branchData = data;
              })

    this.api.getPOCDetails(this.coreData.relTenantInstitutionId)
    .subscribe(res => {
      this.pocData = res;

      console.log("res", res)
    })
  }

 myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  
  pocData: any;
  image: any
  @Input() data: any;
  branchData: any = [];
  @Input() coreData: any;
  constructor(private route: ActivatedRoute, private api : InstitutionService) {
    this.route.params.subscribe((param:any) => {
      console.log("route param", param);
      console.log("d", this.data);
    })

 
   }

  getRandomColor() {
    return {
      'border-color': this.myArray[Math.floor(Math.random() * this.myArray.length)]
    }
  }
  ngOnInit() {
    
  }

}

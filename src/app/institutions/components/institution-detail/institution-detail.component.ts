import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.css']
})
export class InstitutionDetailComponent implements OnInit {

 myArray: any = ['#3F51B5 ', '#F44336', '#FF5722','#FFC107','#4CAF50','#607D8B'];  

  @Input() data: any;
  @Input() coreData: any;
  constructor(private route: ActivatedRoute) {

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

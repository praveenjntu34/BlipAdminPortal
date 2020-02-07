import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ParentsService } from './parents.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

      // array of all items to be paged
      items: any;

      // current page of items
      pageOfItems: any;

      uri = 'http://localhost:8080/parents';  

  constructor( private parentsService:ParentsService,private httpClient:HttpClient) { 
  }
    ngOnInit() {
        this.httpClient.get(`${this.uri}`)  
        .subscribe(data => {
             console.log(data);
             this.items=data;
          });
    }
    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

}

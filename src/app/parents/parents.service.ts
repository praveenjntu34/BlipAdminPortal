import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';  
import { TestBed } from '@angular/core/testing';
@Injectable({  
  providedIn: 'root'  
})  
export class ParentsService {  
  uri = 'http://localhost:8080/parents';  
  constructor(private http: HttpClient) { }  
   datas:any; 
  rowData :any;
  getPosts() { 
    this.http.get(`${this.uri}`)  
        .subscribe(data => {
             console.log(data);
          });
          return this.datas;
  };
 
}  
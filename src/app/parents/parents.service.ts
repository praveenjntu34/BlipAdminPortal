import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';  
import { TestBed } from '@angular/core/testing';
import { Parent } from './parent';
import { AlertService } from '../_alert/alert.service';
import { ModalService } from '../_modal/modal.service';
import { Posts } from '../posts';
@Injectable({  
  providedIn: 'root'  
})  
export class ParentsService {  
  uri = 'http://localhost:8080/parents';
  constructor(private http: HttpClient, private alertService: AlertService,private modalService: ModalService) { }  
   datas:any; 
  rowData :any;
  getPosts() { 
    this.http.get(`${this.uri}`)  
        .subscribe(data => {
             console.log(data);
          });
          return this.datas;
  };
  addParent(parent: Parent) {  
    this.http.post(`${this.uri}`, parent)  
        .subscribe(data => {
            console.log(" ------ "+data);
            this.alertService.success("Parent Added");
            this.modalService.close('');
          });
  };
  deleteParent(parentId) { 
    console.log("Delete parent "+parentId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        parentId: 1
      },
    };
    this.http.delete(`${this.uri}`,options)  
        .subscribe(data => {
            console.log("service ------ "+data);
            this.alertService.success("Parent Created");
          });
  }; 

  updateParent(parent: Parent) {  
    parent.personId=1;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        parent
      },
    };
    this.http.put(`${this.uri}`,parent,options)  
      .subscribe(data => {
          console.log(" ------ "+data);
          this.alertService.success("Parent updated");
          this.modalService.close('editParentModal');
        });
};
}  
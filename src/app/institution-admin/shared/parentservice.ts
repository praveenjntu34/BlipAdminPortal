import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
import { Subscription, BehaviorSubject } from 'rxjs';
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class ParentService{

  public parentUpdateList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public newParentData: any;

  addParent(data) {
    let headers = new Headers();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'undefined',
    //     'processData': 'false',
    //     'cache': 'false'
    //   })
    // }
    return this.http.post(environment.baseUrl + 'parent', data);

      // return this.http.post(environment.baseUrl + 'post',post )
  }

  addParentCsv(file) {
    let headers = new Headers();

    const formData =  new FormData();
    formData.append('file',file);
    return this.http.post(environment.baseUrl + 'parent/file', formData);
  }

  deleteParent(deleteData) {
    return this.http.post(environment.baseUrl + 'parent/delete', deleteData);

  }

  updateparent(data) {
    return this.http.post(environment.baseUrl + 'update-parent', data);
  }

  getAllParents(relTenantInstitutionId) {
    return this.http.get(environment.baseUrl + 'parent?relTenantInstitutionId=' + relTenantInstitutionId);
  }

  getSingleParents(childId) {
    return this.http.get(environment.baseUrl + 'parent/single?childId=' + childId);
  }
  constructor(private http: HttpClient) { }


  public setNewParentData(response) {
    
    this.newParentData = response;
    this.parentUpdateList.next(true);
  }

  public getNewParentData() {
    return this.newParentData;
  }

  public resetParentData() {
    this.newParentData = null;
  }
  
}

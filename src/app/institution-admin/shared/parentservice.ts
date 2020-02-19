import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class ParentService{



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


  constructor(private http: HttpClient) { }

  
}

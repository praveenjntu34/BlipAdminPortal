import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class PostService{



  addPost(data) {
    let headers = new Headers();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'undefined',
    //     'processData': 'false',
    //     'cache': 'false'
    //   })
    // }
    return this.http.post(environment.baseUrl + 'post', data);

      // return this.http.post(environment.baseUrl + 'post',post )
  }

  getAllPosts(relTenantInstitutionId, pageNumber) {
    return this.http.get(environment.baseUrl + 'post/' + relTenantInstitutionId + '?pageNumber=' + pageNumber + '&size=12');
  }


  addPostFile(file) {
    let headers = new Headers();

    const formData =  new FormData();
    formData.append('file',file);
    return this.http.post(environment.baseUrl + 'post-file', formData);
  }

  constructor(private http: HttpClient) { }

  
}

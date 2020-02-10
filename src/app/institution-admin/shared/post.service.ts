import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class PostService{



  addPost(post) {
    let headers = new Headers();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'undefined'
      })
    }

      return this.http.post(environment.baseUrl + 'post',post, httpOptions )
  }

  constructor(private http: HttpClient) { }

  
}

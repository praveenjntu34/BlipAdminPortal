import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';  
import { Posts } from './posts';
import { TestBed } from '@angular/core/testing';
import { AlertService } from './_alert';
import { PostsComponent } from './posts/posts.component';
import { ModalService } from './_modal/modal.service';
@Injectable({  
  providedIn: 'root'  
})  
export class PostsService {  
  uri = 'http://localhost:8080/posts';  
  constructor(private http: HttpClient, private alertService: AlertService,private modalService: ModalService) { }  
  success(message: string) {
    this.alertService.success(message);
   }
   datas:any; 
  addPost(posts: Posts) {  
    this.http.post(`${this.uri}`, posts)  
        .subscribe(data => {
            console.log(" ------ "+data);
            this.alertService.success("Post Created");
            this.modalService.close('addPostModal');
          });
  };
  rowData :any;
  getPosts() { 
    this.http.get(`${this.uri}`)  
        .subscribe(data => {
            this.alertService.success("Post Created");
          });
          return this.datas;
  };
  deletePosts(postId) { 
    console.log("Delete post "+postId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        postId: 18
      },
    };
    this.http.delete(`${this.uri}`,options)  
        .subscribe(data => {
            console.log("service ------ "+data);
            this.alertService.success("Post Created");
          });
  }; 

  private getArgHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    };
    return httpOptions;
};
updatePost(posts: Posts) {  
  posts.postId=19;
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      posts
    },
  };
  this.http.put(`${this.uri}`,posts,options)  
      .subscribe(data => {
          console.log(" ------ "+data);
          this.alertService.success("Post updated");
          this.modalService.close('editPostModal');
        });
};
}  
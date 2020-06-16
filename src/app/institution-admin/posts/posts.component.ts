import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { PostService } from '../shared/post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EditPostModalComponent } from '../modals/edit-post-modal/edit-post-modal.component';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  // posts = [
  //   1,2,3,4
  // ]

  posts: any;
  pageArray: Array<number>;
  selectedPage: number = 1;
  currentIndex: number = 1;

  constructor(private matDialogue: MatDialog, private postService: PostService, private ngxService: NgxUiLoaderService) { 
    
  }

  openAddPostModal() {
    this.matDialogue.open(AddPostModalComponent, {
      width: '550px',
      height: '500px',
      panelClass: 'custom-dialog-container'
    })
  }

  openEditModal(index){
    this.matDialogue.open(EditPostModalComponent, {
      width: '550px',
      height: '400px',
      data:this.posts[index],
    })
 }
  ngOnInit() {
    this.postService.getAllPosts(localStorage.getItem("loggedInTenantId"),0)
          .subscribe((data: any) => {
            this.posts = data.postList;
            console.log(this.posts);
            this.pageArray = new Array(Math.ceil(data.pages))
   
          })
  }

  deletePost(index) {
    this.ngxService.start();
    this.postService.delete(this.posts[index].postId) 
          .subscribe(data => {
            this.ngxService.stop();
            window.location.reload();
          })
  }
  getCurrentPage(pageNo: number) {
    this.ngxService.start();
    console.log("default config");
    
    this.selectedPage = pageNo;
    this.postService.getAllPosts(localStorage.getItem("loggedInTenantId"),pageNo -1)
    .subscribe((data: any) => {
      this.posts = data.postList;
      console.log(this.posts);
      this.pageArray = new Array(Math.ceil(data.pages))
      this.ngxService.stop();
    })
  }

}

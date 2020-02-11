import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { PostService } from '../shared/post.service';

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
  constructor(private matDialogue: MatDialog, private postService: PostService) { 
    
  }

  openAddPostModal() {
    this.matDialogue.open(AddPostModalComponent, {
      width: '1000px',
      height: '600px',
      panelClass: 'custom-dialog-container'
    })
  }
  ngOnInit() {
    this.postService.getAllPosts(1)
          .subscribe((data: any) => {
            this.posts = data;
            console.log(this.posts);
            
          })
  }

}

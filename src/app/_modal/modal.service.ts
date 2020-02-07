import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Posts } from '../posts';
import { PostsComponent } from '../posts/posts.component';
import { PostsService } from '../posts.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    posts:Posts
    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }
    editAngForm: FormGroup;  
    postComponent:PostsComponent;
    open(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }
    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
    openEditPost(id: string,rowData) {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
        console.log(rowData.data.postText);
        console.log(rowData.data.postId);
       // document.getElementById('editPostsTextObj').value=rowData.data.postText;
    }
}
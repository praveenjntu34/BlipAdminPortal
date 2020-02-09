import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { InstitutionAdminRoutingModule } from './institution-admin-routing.module';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostsComponent, AddPostModalComponent],
  entryComponents: [AddPostModalComponent],
  imports: [
    CommonModule,
    InstitutionAdminRoutingModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class InstitutionAdminModule { }

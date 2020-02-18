import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { InstitutionAdminRoutingModule } from './institution-admin-routing.module';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BannersComponent } from './banners/banners.component';
import { AddBannerModalComponent } from './add-banner-modal/add-banner-modal.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { AddInstructorModalComponent } from '../institutions/components/add-instructor-modal/add-instructor-modal.component';
import { InstructorTabComponent } from '../institutions/components/instructor-tab/instructor-tab.component';
import { InstitutionsModule } from '../institutions/institutions.module';


@NgModule({
  declarations: [PostsComponent, AddPostModalComponent, BannersComponent, AddBannerModalComponent, InstructorsComponent],
  entryComponents: [AddPostModalComponent, AddBannerModalComponent,AddInstructorModalComponent,InstructorTabComponent],
  imports: [
    CommonModule,
    InstitutionAdminRoutingModule,
    MatDialogModule,
    InstitutionsModule,
    ReactiveFormsModule
  ]
})
export class InstitutionAdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { InstitutionAdminRoutingModule } from './institution-admin-routing.module';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BannersComponent } from './banners/banners.component';
import { AddBannerModalComponent } from './add-banner-modal/add-banner-modal.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { AddInstructorModalComponent } from '../institutions/components/add-instructor-modal/add-instructor-modal.component';
import { InstructorTabComponent } from '../institutions/components/instructor-tab/instructor-tab.component';
import { InstitutionsModule } from '../institutions/institutions.module';
import { ParentsComponent } from './parents/parents.component';
import { AddParentModalComponent } from './add-parent-modal/add-parent-modal.component';
import { SettingsComponent } from './settings/settings.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditInstructorModalComponent } from './modals/edit-instructor-modal/edit-instructor-modal.component';
import { DeleteInstructorModalComponent } from './modals/delete-instructor-modal/delete-instructor-modal.component';
import { InstitutionProfileComponent } from './institution-profile/institution-profile.component';
import { EditParentModalComponent } from './modals/edit-parent-modal/edit-parent-modal.component';
import { AddParentCsvComponent } from './add-parent-csv/add-parent-csv.component';
import { EditPostModalComponent } from './modals/edit-post-modal/edit-post-modal.component';
import {MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [PostsComponent, AddPostModalComponent, BannersComponent, AddBannerModalComponent, InstructorsComponent, ParentsComponent, AddParentModalComponent, SettingsComponent, EditInstructorModalComponent, DeleteInstructorModalComponent, InstitutionProfileComponent, EditParentModalComponent, AddParentCsvComponent, EditPostModalComponent],
  entryComponents: [AddPostModalComponent,EditPostModalComponent,EditInstructorModalComponent, AddParentCsvComponent,DeleteInstructorModalComponent, AddBannerModalComponent,AddInstructorModalComponent,InstructorTabComponent, AddParentModalComponent, EditParentModalComponent],
  imports: [
    CommonModule,
    InstitutionAdminRoutingModule,
    MatDialogModule,
    InstitutionsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class InstitutionAdminModule { }

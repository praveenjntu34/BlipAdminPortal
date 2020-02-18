import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { BannersComponent } from './banners/banners.component';
import { InstructorsComponent } from './instructors/instructors.component';
const institutionAminRoutes: Routes = [
	{ 
	  path: 'posts',
    component: PostsComponent,
  },
  { 
	  path: 'banners',
    component: BannersComponent,
  },
  { 
	  path: 'instructors',
    component: InstructorsComponent,
  }   
];

@NgModule({
  imports: [ RouterModule.forChild(institutionAminRoutes) ],
  exports: [ RouterModule ]
})
export class InstitutionAdminRoutingModule { } 
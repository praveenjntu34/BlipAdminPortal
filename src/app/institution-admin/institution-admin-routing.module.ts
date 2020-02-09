import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
const institutionAminRoutes: Routes = [
	{ 
	  path: '',
    component: PostsComponent,
  } 
];

@NgModule({
  imports: [ RouterModule.forChild(institutionAminRoutes) ],
  exports: [ RouterModule ]
})
export class InstitutionAdminRoutingModule { } 
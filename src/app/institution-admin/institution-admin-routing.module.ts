import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { BannersComponent } from './banners/banners.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { ParentsComponent } from './parents/parents.component';
import { SettingsComponent } from './settings/settings.component';
import { InstitutionProfileComponent } from './institution-profile/institution-profile.component';

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
  },
  { 
	  path: 'parents',
    component: ParentsComponent,
  },
  { 
	  path: 'settings',
    component: SettingsComponent,
  },
  { 
	  path: 'institution-profile',
    component: InstitutionProfileComponent,
  }       
];

@NgModule({
  imports: [ RouterModule.forChild(institutionAminRoutes) ],
  exports: [ RouterModule ]
})
export class InstitutionAdminRoutingModule { } 
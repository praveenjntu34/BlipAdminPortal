import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListPageComponent } from './pages/institution-list-page/institution-list-page.component';
import { InstitutionDetailPageComponent } from './pages/institution-detail-page/institution-detail-page.component'
const institutionRoutes: Routes = [
	{ 
	  path: '',
    component: InstitutionListPageComponent,
  } ,
  {
    path: ':id',
    component: InstitutionDetailPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(institutionRoutes)],
  exports: [ RouterModule ]
})
export class InstitutionRoutingModule { } 
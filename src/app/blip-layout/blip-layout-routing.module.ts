import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListComponent } from '../institutions/components/institution-list/institution-list.component';

const authRoutes: Routes = [

  {
    path: 'institutions',
    component: InstitutionListComponent
  } 
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { } 
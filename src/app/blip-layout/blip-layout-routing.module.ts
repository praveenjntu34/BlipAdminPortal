import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListComponent } from '../institutions/components/institution-list/institution-list.component';

const authRoutes: Routes = [

  {
    path: 'institutions',
    loadChildren: '../institutions/institutions.module#InstitutionsModule'
  } 
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class BlipRoutingModule { } 
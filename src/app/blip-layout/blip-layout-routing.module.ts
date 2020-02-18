import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListComponent } from '../institutions/components/institution-list/institution-list.component';
import { BlipLayoutComponent } from './blip-layout/blip-layout.component';

const authRoutes: Routes = [

  {
    path: 'institutions',
    loadChildren: '../institutions/institutions.module#InstitutionsModule'
  },
  {
    path: 'admin',
    loadChildren: '../institution-admin/institution-admin.module#InstitutionAdminModule'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class BlipRoutingModule { } 
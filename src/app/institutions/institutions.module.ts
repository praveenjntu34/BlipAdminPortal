import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionListPageComponent } from './pages/institution-list-page/institution-list-page.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { DashboardMenuModule } from '../dashboard-menu/dashboard-menu.module';



@NgModule({
  declarations: [InstitutionListComponent, InstitutionListPageComponent],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    DashboardMenuModule
  ]
})
export class InstitutionsModule { }

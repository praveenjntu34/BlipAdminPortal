import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuRoutingModule } from './dashboard-menu.routing.module';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class DashboardMenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuRoutingModule } from './dashboard-menu.routing.module';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';



@NgModule({
  declarations: [SidebarComponent, MenuBarComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class DashboardMenuModule { }

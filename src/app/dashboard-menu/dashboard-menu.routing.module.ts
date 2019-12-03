import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SidebarComponent } from './components/sidebar/sidebar.component';
const menuRoutes: Routes = [
	{ 
	  path: '',
      component: SidebarComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(menuRoutes) ],
  exports: [ RouterModule ]
})
export class MenuRoutingModule { } 
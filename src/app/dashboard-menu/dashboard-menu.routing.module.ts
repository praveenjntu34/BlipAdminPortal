import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
const menuRoutes: Routes = [
	{ 
	  path: '',
      component: SidebarComponent,
  },
  { 
	  path: 'top',
      component: MenuBarComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(menuRoutes) ],
  exports: [ RouterModule ]
})
export class MenuRoutingModule { } 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './components/login/login.component';

const countryRoutes: Routes = [
	{ 
	  path: '',
    component: LoginComponent,
	}  
];

@NgModule({
  imports: [ RouterModule.forChild(countryRoutes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule { } 
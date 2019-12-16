import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RoutedLoginComponent } from './pages/routed-login.component';

const authRoutes: Routes = [
	{ 
	  path: '',
    component: RoutedLoginComponent,
  }, 
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }   
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { } 
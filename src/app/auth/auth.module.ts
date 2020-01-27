import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SuccessPasswordComponent } from './components/success-password/success-password.component'
import { RoutedLoginComponent } from './pages/routed-login.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, OtpComponent, ChangePasswordComponent, RoutedLoginComponent,SuccessPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

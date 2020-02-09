import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routing';
import { BlipLayoutComponent } from './blip-layout/blip-layout/blip-layout.component';
import { DashboardMenuModule } from './dashboard-menu/dashboard-menu.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginComponent } from './auth/components/login/login.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { OtpComponent } from './auth/components/otp/otp.component';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { SuccessPasswordComponent } from './auth/components/success-password/success-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BlipLayoutComponent,
    LoginComponent, ForgotPasswordComponent, OtpComponent, ChangePasswordComponent,SuccessPasswordComponent
  ],
  imports: [
    BrowserModule,
    DashboardMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

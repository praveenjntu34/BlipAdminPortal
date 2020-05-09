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
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from  'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#316AFF",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 0,
  delay: 0,
  fgsColor: "#316AFF",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "ball-spin-clockwise-fade-rotating",
  gap: 24,
  logoPosition : "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(205,205,205,0.32)",
  pbColor: "#316AFF",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 500
};

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
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

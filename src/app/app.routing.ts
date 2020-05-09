import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { BlipLayoutComponent } from './blip-layout/blip-layout/blip-layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { OtpComponent } from './auth/components/otp/otp.component';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';

// export const appRoutes: Routes =[
//     {
//       path: '',
//       redirectTo: 'institutions',
//       pathMatch: 'full',
//     }, {
//       path: '',
//       component: BlipLayoutComponent,
//       children: [
//           {
//         path: '',
//         loadChildren: './blip-layout/blip-layout.module#BlipLayoutModule'
//     }]}
//   ];

export const appRoutes: Routes = [

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
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
    ,
    {
        path: 'home',
        component: BlipLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './blip-layout/blip-layout.module#BlipLayoutModule'
            }]
    }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { BlipLayoutComponent } from './blip-layout/blip-layout/blip-layout.component';

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
        redirectTo: '/institutions',
        pathMatch: 'full'
    }
    // ,
    // {
    //     path: 'auth',
    //     loadChildren: './auth/auth.module#AuthModule'
    // },
    // {
    //     path: 'menu',
    //     loadChildren: './dashboard-menu/dashboard-menu.module#DashboardMenuModule'
    // }
    ,
    {
        path: '',
        component: BlipLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './blip-layout/blip-layout.module#BlipLayoutModule'
            }]
    }
    // ,
    // {
    //     path: 'institution',
    //     loadChildren: './institutions/institutions.module#InstitutionsModule'
    // }
];

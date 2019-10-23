import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
export const appRoutes: Routes = [	
    // {
    //  path: '',
    //  redirectTo: '/home',
    //  pathMatch: 'full'
    // },
   
    {
        path: 'blog',
        loadChildren: './blogs/blogs.module#BlogsModule'
    }
 ];
 
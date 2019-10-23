import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component'

export const blogRoutes: Routes = [
    {
        path: '',
        component: BlogHomeComponent
    }
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component'

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeScreenComponent
    }
];
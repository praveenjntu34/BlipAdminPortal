import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { homeRoutes } from './home-routing.module';

@NgModule({
  declarations: [HomeScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(homeRoutes)
  ]
})
export class HomeModule {
  constructor() {
    console.log('HomeModule loaded.');
 }
 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { blogRoutes } from './blog.routing'
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [BlogHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogsModule {
  constructor() {
    console.log('BlogModule loaded.');
 }
 }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routing';
import { BlipLayoutComponent } from './blip-layout/blip-layout/blip-layout.component';
import { DashboardMenuModule } from './dashboard-menu/dashboard-menu.module';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    BlipLayoutComponent
  ],
  imports: [
    BrowserModule,
    DashboardMenuModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

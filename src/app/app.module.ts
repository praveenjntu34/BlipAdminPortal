import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routing';
import { BlipLayoutComponent } from './blip-layout/blip-layout/blip-layout.component';
import { DashboardMenuModule } from './dashboard-menu/dashboard-menu.module';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './posts/posts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { PostsService } from './posts.service';
import { AlertModule } from './_alert';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from "./posts/cell.component";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './_modal/modal.service';
import { ModalModule } from './_modal/modal.module';
import { ModalComponent } from './_modal/modal.component';
import { ParentsComponent } from './parents/parents.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HttpModule } from '@angular/http';
import { ParentsService } from './parents/parents.service';
@NgModule({
  declarations: [
    AppComponent,
    BlipLayoutComponent,
    PostsComponent,
    CellCustomComponent,
    ConfirmationDialogComponent,
    ParentsComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    DashboardMenuModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    AgGridModule.withComponents([]),
    NgbModalModule,
    ModalModule,
    HttpModule
  ],
  entryComponents: [CellCustomComponent,ConfirmationDialogComponent],
  providers: [PostsService,ConfirmationDialogService,ModalService,ParentsService],
  bootstrap: [AppComponent],
})
export class AppModule { }

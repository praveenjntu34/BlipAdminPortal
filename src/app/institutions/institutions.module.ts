import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionListPageComponent } from './pages/institution-list-page/institution-list-page.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { DashboardMenuModule } from '../dashboard-menu/dashboard-menu.module';
import { InstitutionDetailComponent } from './components/institution-detail/institution-detail.component';
import { InstitutionDetailPageComponent } from './pages/institution-detail-page/institution-detail-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { InstructorTabComponent } from './components/instructor-tab/instructor-tab.component';
import { AddInstructorModalComponent } from './components/add-instructor-modal/add-instructor-modal.component';
import { AddInstitutionModalComponent } from './components/add-institution-modal/add-institution-modal.component';
import { AddBranchModalComponent } from './components/add-branch-modal/add-branch-modal.component'

@NgModule({
  declarations: [InstitutionListComponent, InstitutionListPageComponent, InstitutionDetailComponent, InstitutionDetailPageComponent, InstructorTabComponent, AddInstructorModalComponent, AddInstitutionModalComponent, AddBranchModalComponent],
  entryComponents: [InstructorTabComponent, AddInstructorModalComponent, AddInstitutionModalComponent, AddBranchModalComponent],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    DashboardMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [NgbActiveModal]
})
export class InstitutionsModule { }

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddParentModalComponent } from '../add-parent-modal/add-parent-modal.component';
import { ParentService } from '../shared/parentservice';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  data: any = [];
  private subscriptions: Subscription[] =[];
  constructor(private matDialog: MatDialog, private parentService: ParentService,private ngxService: NgxUiLoaderService) {

   }

  ngOnInit() {
    this.ngxService.start();
    this.parentService.getAllParents(localStorage.getItem('loggedInTenantId'))
          .subscribe(response => {
            console.log(response);
            this.data = response;
            this.ngxService.stop();
          })
    this.updateparents();
  }

  addParenModal(){
    this.matDialog.open(AddParentModalComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container'
    })
  } 

  private updateparents() {
    this.subscriptions.push(this.parentService.parentUpdateList
      .subscribe(isUpdated => {
        if(isUpdated) {
          const newDataToAdd = this.parentService.getNewParentData();
          this.parentService.resetParentData();
  
          if(newDataToAdd != null) {
            this.data.push(newDataToAdd);
          }
        }
      })
      )
   }

}

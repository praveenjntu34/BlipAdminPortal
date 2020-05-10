import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddParentModalComponent } from '../add-parent-modal/add-parent-modal.component';
import { ParentService } from '../shared/parentservice';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EditParentModalComponent } from '../modals/edit-parent-modal/edit-parent-modal.component';
import { AddParentCsvComponent } from '../add-parent-csv/add-parent-csv.component';

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

   addCsv() {

    //  this.parentService.addParentCsv(this.bannerForm.value.bannerStream)
    //         .subscribe((data: any) => {
    //           console.log("response", data);
    //         })
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

  addParenCsvModal(){
    this.matDialog.open(AddParentCsvComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container'
    })
  } 

  addParenModal(){
    this.matDialog.open(AddParentModalComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container'
    })
  } 

  openEditModal(index){
    this.matDialog.open(EditParentModalComponent, {
      width: '550px',
      height: '500px',
      data:this.data[index].childId,
    })
 }

 deleteUser(index) {
   console.log(this.data[index]);
   var object = {
     personId: this.data[index].personId,
     loginCredentialId: this.data[index].loginCredentialId,
     parentId: this.data[index].parentId,
     childId: this.data[index].childId
   }

   this.parentService.deleteParent(object)
        .subscribe(res => {
          console.log(res);
          
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

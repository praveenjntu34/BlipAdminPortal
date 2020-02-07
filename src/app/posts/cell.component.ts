import {Component, OnInit, NgModule} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardMenuModule } from '../dashboard-menu/dashboard-menu.module';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { PostsService } from '../posts.service';
import { ModalService } from '../_modal';
import { FormGroup } from '@angular/forms';
import { Posts } from '../posts';
@Component({
    templateUrl: './cell.component.html'
  })
  @NgModule({
    imports: [
      DashboardMenuModule
    ]
  })
export class CellCustomComponent implements OnInit {
    data: any;
    params: any;
    constructor(private modalService:ModalService,private http: HttpClient, private router: Router,private confirmationDialogService: ConfirmationDialogService,private ps:PostsService) {}
  
    agInit(params) {
      this.params = params;
      this.data = params.value;
    }
  
    ngOnInit() {}

    editRow() {
      let rowData = this.params;
      let i = rowData.rowIndex;
      this.modalService.openEditPost('editPostModal',this.params);
      console.log("rowData edit row "+rowData);
    }
  
    deleteRow() {
      let rowData = this.params;
      console.log(rowData.data);
      let postId=rowData.data.postId;
      this.openConfirmationDialog(postId);
    }
   
    public openConfirmationDialog(postId) {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete the Post ?')
      .then(
        (confirmed) =>
       //console.log('User confirmed:', confirmed)
        this.callDelete(confirmed,postId)
        )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    callDelete(confirmed,postId)
    {
      console.log('User confirmed:', confirmed);
      if(confirmed)
      {
          this.ps.deletePosts(postId);
      }

    }
  }
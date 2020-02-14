import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ParentsService } from './parents.service';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../_modal/modal.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { Parent } from './parent';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

      // array of all items to be paged
      items: any;

      // current page of items
      pageOfItems: any;

      uri = 'http://localhost:8080/parents';  
      angForm: FormGroup;  
      angFormEdit: FormGroup;  
      submitted = false;  
  constructor( private parentsService:ParentsService,private httpClient:HttpClient,private modalService: ModalService,private fb: FormBuilder,private confirmationDialogService: ConfirmationDialogService) { 
    this.createForm();  
  }
   createForm() {  
    this.angForm = this.fb.group({  
      PersonId: ['', Validators.required ],  
      SecondaryPhoneNumber: ['', Validators.required ],  
      RelInstituitionId: ['', Validators.required ] 
    }); 
    this.angFormEdit = this.fb.group({  
      SecondaryPhoneNumberEdit: ['', Validators.required ],  
      RelInstituitionIdEdit: ['', Validators.required ]
     });
  } 
    ngOnInit() {
        this.httpClient.get(`${this.uri}`)  
        .subscribe(data => {
             console.log(data);
             this.items=data;
          });
    }
    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }
    openModal(id: string) {
      console.log("Open Parent Dialog");
      this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  parent : Parent=new Parent();  
  addParent(personId, secondaryPhoneNumber, relInstituitionId) {  
    this.parent.personId=personId;
    this.parent.secondaryPhoneNumber=secondaryPhoneNumber;
    this.parent.relTenantInstitutionId=relInstituitionId;
    this.parentsService.addParent(this.parent);  
  } 
  deleteParent(parentId) {
    console.log(parentId);
    this.openConfirmationDialog(parentId);
  }
  editParent( secondaryPhoneNumber, relInstituitionId) {  
    this.parent.secondaryPhoneNumber=secondaryPhoneNumber;
    this.parent.relTenantInstitutionId=relInstituitionId;
    this.parentsService.updateParent(this.parent);  
  } 
  public openConfirmationDialog(parentId) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete the Parent ?')
    .then(
      (confirmed) =>
      this.callDelete(confirmed,parentId)
      )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  callDelete(confirmed,parentId)
  {
    console.log('User confirmed:', confirmed);
    if(confirmed)
    {
        this.parentsService.deleteParent(parentId);
    }

  }
}

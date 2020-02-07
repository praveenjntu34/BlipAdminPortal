import { Component, OnInit } from '@angular/core';
import { DashboardMenuModule } from '../dashboard-menu/dashboard-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { PostsService } from '../posts.service'; 
import { Posts } from '../posts';
import { AlertService } from '../_alert';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { CellCustomComponent } from "./cell.component";
import { ModalService } from '../_modal';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})

@NgModule({
  imports: [
    DashboardMenuModule,
    CellCustomComponent
  ]
})
export class PostsComponent implements OnInit {

  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;
  private context;
  private frameworkComponents;

  columnDefs = [
    {headerName:'Post Id',field: 'postId' ,sortable: true, filter: true},
    {headerName:'Post Text',field: 'postText',sortable: true, filter: true },
    {headerName:'Post Type',field: 'postType',sortable: true, filter: true},
    {headerName:'Operation',field: 'anchorTag',sortable: true, filter: true,cellRendererFramework: CellCustomComponent },
    
];

rowData :any;

  angForm: FormGroup;  
  angFormEdit: FormGroup;  
  constructor(private fb: FormBuilder, private ps: PostsService,private alertService: AlertService,private http:HttpClient,private modalService: ModalService) {  
    this.createForm();  

  }  

  submitted = false;  
   createForm() {  
    this.angForm = this.fb.group({  
      PostsText: ['', Validators.required ],  
      PostsType: ['', Validators.required ],  
      SectionId: ['', Validators.required ] ,
      AttachmentStreamId: ['', Validators.required ] ,
    }); 
    this.angFormEdit = this.fb.group({  
     editPostsText: ['', Validators.required ],  
     editPostsType: ['', Validators.required ],  
     editSectionId: ['', Validators.required ]
    });  
  } 
  posts : Posts=new Posts();  
  addPost(PostsText, PostsType, SectionId,AttachmentStreamId) {  
    console.log("AttachmentStreamId  --- "+PostsText);
    this.posts.postText=PostsText;
    this.posts.postType=PostsType;
    this.posts.sectionId=SectionId;
    this.posts.attachmentStreamId='DF215E10-8BD4-4401-B2DC-99BB03135F2E';
    this.posts.auditCreatedBy=100;
    this.posts.auditCreatedDate=Number(new Date());
    this.posts.auditModifiedBy=100;
    this.posts.auditModifiedDate=Number(new Date());
    this.ps.addPost(this.posts);  
  } 
  editPost(PostsText, PostsType, SectionId,AttachmentStreamId) {  
    console.log("PostsText  --- "+PostsText);
    this.posts.postText=PostsText;
    this.posts.postId=19;
    this.ps.updatePost(this.posts);  
  };   
  uri = 'http://localhost:8080/posts';  
  ngOnInit() {  
    this.defaultColDef = {
      enablePivot: true,
      sortable: true,
      resizable: false,
      filter: true
    };
    this.paginationPageSize = 109;
    this.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    
    this.context = { componentParent: this };
    this.frameworkComponents = {
      cellRenderer: CellCustomComponent
    };

    this.http.get(`${this.uri}`)  
    .subscribe(data => {
        console.log("Component rowData -- ------ "+data);
        this.rowData=data;
      });
  }  
  openModal(id: string) {
    console.log("OPEN EDIT");
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
